<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->json('body')->nullable()->after('excerpt');
        });

        DB::table('services')
            ->whereNotNull('description')
            ->orderBy('id')
            ->chunkById(100, function ($services): void {
                foreach ($services as $service) {
                    $paragraphs = preg_split('/\\R{2,}/', trim((string) $service->description)) ?: [];
                    $body = collect($paragraphs)
                        ->map(fn (string $paragraph) => trim($paragraph))
                        ->filter()
                        ->map(fn (string $paragraph) => [
                            'type' => 'paragraph',
                            'content' => $paragraph,
                        ])
                        ->values()
                        ->all();

                    DB::table('services')
                        ->where('id', $service->id)
                        ->update([
                            'body' => json_encode(
                                $body,
                                JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES,
                            ),
                        ]);
                }
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('body');
        });
    }
};
