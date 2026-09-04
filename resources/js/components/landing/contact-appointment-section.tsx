import { useForm } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import type { CSSProperties, FormEvent } from 'react';

const fieldClass =
    'w-full border-0 border-b border-white/35 bg-transparent px-0 py-3 text-sm text-white placeholder:text-white/80 focus:border-white focus:ring-0 focus:outline-none';

const revealStyle = (delay: number) =>
    ({
        '--landing-reveal-delay': `${delay}ms`,
    }) as CSSProperties;

export default function ContactAppointmentSection() {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } =
        useForm({
            name: '',
            phone: '',
            email: '',
            appointment_date: '',
            message: '',
        });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post('/appointments', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section
            id="agendar-cita"
            className="relative scroll-mt-24 overflow-hidden bg-[#fe9fb0] text-white sm:scroll-mt-28"
        >
            <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-[linear-gradient(90deg,#f0a7da_0%,#fe9fb0_44%,#e9648d_100%)] md:block" />
            <img
                src="/images/Contact/ContactAppointment.png"
                alt="Doctores de la clínica"
                className="absolute inset-y-0 right-0 h-full w-full object-cover object-[center_top] md:w-1/2 lg:object-[center_18%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(240,167,218,0.86),rgba(254,159,176,0.82)_48%,rgba(254,159,176,0.24))] md:bg-[linear-gradient(90deg,#f0a7da_0%,#fe9fb0_32%,rgba(254,159,176,0.72)_44%,rgba(254,159,176,0.12)_52%,rgba(254,159,176,0)_64%)]" />

            <div className="relative z-10 mx-auto flex min-h-[700px] w-[min(1180px,calc(100%_-_2rem))] items-center py-20 sm:w-[min(1180px,calc(100%_-_3rem))] sm:py-24 lg:min-h-[760px] lg:justify-start lg:py-28">
                <form
                    onSubmit={submit}
                    className="w-full max-w-[520px] rounded-lg bg-[#e06488]/88 p-8 shadow-[0_28px_70px_rgba(122,0,38,0.18)] backdrop-blur-sm sm:p-12 lg:ml-6 xl:ml-0"
                >
                    <div
                        className="landing-reveal-down"
                        style={revealStyle(80)}
                    >
                        <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
                            Haz una cita
                        </p>
                        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                            Agenda tu consulta
                        </h2>
                    </div>

                    <div
                        className="landing-reveal-down mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2"
                        style={revealStyle(160)}
                    >
                        <label>
                            <span className="sr-only">Nombre</span>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(event) =>
                                    setData('name', event.target.value)
                                }
                                placeholder="Nombre"
                                className={fieldClass}
                            />
                            {errors.name && (
                                <span className="mt-1 block text-xs text-white">
                                    {errors.name}
                                </span>
                            )}
                        </label>

                        <label>
                            <span className="sr-only">Teléfono</span>
                            <input
                                type="tel"
                                name="phone"
                                value={data.phone}
                                onChange={(event) =>
                                    setData('phone', event.target.value)
                                }
                                placeholder="Teléfono"
                                className={fieldClass}
                            />
                            {errors.phone && (
                                <span className="mt-1 block text-xs text-white">
                                    {errors.phone}
                                </span>
                            )}
                        </label>

                        <label>
                            <span className="sr-only">Correo</span>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(event) =>
                                    setData('email', event.target.value)
                                }
                                placeholder="Correo"
                                className={fieldClass}
                            />
                            {errors.email && (
                                <span className="mt-1 block text-xs text-white">
                                    {errors.email}
                                </span>
                            )}
                        </label>

                        <label>
                            <span className="sr-only">Fecha</span>
                            <input
                                type="date"
                                name="appointment_date"
                                value={data.appointment_date}
                                onChange={(event) =>
                                    setData(
                                        'appointment_date',
                                        event.target.value,
                                    )
                                }
                                placeholder="Fecha"
                                className={fieldClass}
                            />
                            {errors.appointment_date && (
                                <span className="mt-1 block text-xs text-white">
                                    {errors.appointment_date}
                                </span>
                            )}
                        </label>
                    </div>

                    <label
                        className="landing-reveal-down mt-5 block"
                        style={revealStyle(240)}
                    >
                        <span className="sr-only">Mensaje</span>
                        <textarea
                            name="message"
                            placeholder="Mensaje"
                            rows={3}
                            value={data.message}
                            onChange={(event) =>
                                setData('message', event.target.value)
                            }
                            className={`${fieldClass} resize-none`}
                        />
                        {errors.message && (
                            <span className="mt-1 block text-xs text-white">
                                {errors.message}
                            </span>
                        )}
                    </label>

                    {recentlySuccessful && (
                        <p className="mt-6 text-sm font-semibold text-white">
                            Solicitud enviada correctamente.
                        </p>
                    )}

                    <div
                        className="landing-reveal-down"
                        style={revealStyle(320)}
                    >
                        <button
                            type="submit"
                            disabled={processing}
                            className="group mt-10 inline-flex items-center gap-4 text-sm font-bold text-white transition hover:text-white/85"
                        >
                            {processing ? 'Enviando...' : 'Hacer cita'}
                            <span className="grid size-10 place-items-center rounded-full border border-white transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-[#e9648d]">
                                <ArrowUpRight className="size-5" />
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
