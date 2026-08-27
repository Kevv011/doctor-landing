<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\URL;
use Throwable;

class PublicSeoController extends Controller
{
    public function robots(): Response
    {
        $sitemapUrl = URL::to('/sitemap.xml');

        return response(
            "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /login\nDisallow: /settings\n\nSitemap: {$sitemapUrl}\n",
            200,
            ['Content-Type' => 'text/plain; charset=UTF-8'],
        );
    }

    public function sitemap(): Response
    {
        $urls = [
            [
                'loc' => URL::to('/'),
                'changefreq' => 'weekly',
                'priority' => '1.0',
            ],
            [
                'loc' => URL::to('/contact'),
                'changefreq' => 'monthly',
                'priority' => '0.8',
            ],
            [
                'loc' => URL::to('/blog'),
                'changefreq' => 'weekly',
                'priority' => '0.8',
            ],
        ];

        try {
            $posts = BlogPost::query()
                ->published()
                ->get(['slug', 'updated_at', 'published_at']);

            foreach ($posts as $post) {
                $urls[] = [
                    'loc' => URL::to("/blog/{$post->slug}"),
                    'lastmod' => ($post->updated_at ?? $post->published_at)?->toIso8601String(),
                    'changefreq' => 'monthly',
                    'priority' => '0.7',
                ];
            }
        } catch (Throwable) {
            // The base public URLs remain available when the database is unavailable.
        }

        return response()
            ->view('sitemap', ['urls' => $urls])
            ->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
