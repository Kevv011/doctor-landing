import { ArrowUpRight } from 'lucide-react';

const fieldClass =
    'w-full border-0 border-b border-white/35 bg-transparent px-0 py-3 text-sm text-white placeholder:text-white/80 focus:border-white focus:ring-0 focus:outline-none';

export default function ContactAppointmentSection() {
    return (
        <section
            id="agendar-cita"
            className="relative overflow-hidden bg-[#ff91ad] [font-family:Poppins,ui-sans-serif,system-ui,sans-serif] text-white"
        >
            <img
                src="/images/Contact/ContactAppointment2.png"
                alt="Fondo para agendar cita"
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="relative z-10 grid min-h-[700px] lg:grid-cols-2 xl:min-h-[760px]">
                <div className="flex items-center px-6 py-20 sm:px-10 lg:justify-end lg:px-0 lg:py-28">
                    <div className="w-full max-w-[640px] lg:pr-0 xl:pr-10">
                        <form className="ml-auto w-full max-w-[520px] rounded-lg bg-[#e9648d]/95 p-8 shadow-[0_28px_70px_rgba(21,35,74,0.14)] backdrop-blur-sm sm:p-12 lg:-mr-0 xl:-mr-4">
                            <p className="text-xs font-semibold tracking-[0.18em] text-white/80 uppercase">
                                Haz una cita
                            </p>
                            <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                                Agenda tu consulta
                            </h2>

                            <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                                <label>
                                    <span className="sr-only">Nombre</span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nombre"
                                        className={fieldClass}
                                    />
                                </label>

                                <label>
                                    <span className="sr-only">Teléfono</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Teléfono"
                                        className={fieldClass}
                                    />
                                </label>

                                <label>
                                    <span className="sr-only">Correo</span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Correo"
                                        className={fieldClass}
                                    />
                                </label>

                                <label>
                                    <span className="sr-only">Fecha</span>
                                    <input
                                        type="text"
                                        name="date"
                                        placeholder="Fecha"
                                        className={fieldClass}
                                    />
                                </label>
                            </div>

                            <label className="mt-5 block">
                                <span className="sr-only">Mensaje</span>
                                <textarea
                                    name="message"
                                    placeholder="Mensaje"
                                    rows={3}
                                    className={`${fieldClass} resize-none`}
                                />
                            </label>

                            <button
                                type="button"
                                className="mt-10 inline-flex items-center gap-4 text-sm font-bold text-white transition hover:text-white/85"
                            >
                                Hacer cita
                                <span className="grid size-10 place-items-center rounded-full border border-white">
                                    <ArrowUpRight className="size-5" />
                                </span>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="relative min-h-[440px] overflow-hidden lg:min-h-full">
                    <img
                        src="/images/Contact/ContactAppointment.png"
                        alt="Doctores de la clínica"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                </div>
            </div>
        </section>
    );
}
