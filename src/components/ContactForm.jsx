import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Send, User, Mail, MapPin, MessageSquare, Phone, Printer } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from '../utils/animations'

// fields constant moved into component

export default function ContactForm() {
  const { t } = useTranslation()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const fields = [
    { name: 'nom',   label: t('contact.form.name_label'),     type: 'text',  placeholder: t('contact.form.name_placeholder'),        icon: User,
      rules: { required: t('contact.form.name_req') } },
    { name: 'email', label: t('contact.form.email_label'),  type: 'email', placeholder: t('contact.form.email_placeholder'),  icon: Mail,
      rules: { required: t('contact.form.email_req'), pattern: { value: /^\S+@\S+\.\S+$/, message: t('contact.form.email_invalid') } } },
    { name: 'ville', label: t('contact.form.city_label'),           type: 'text',  placeholder: t('contact.form.city_placeholder'),      icon: MapPin,
      rules: { required: t('contact.form.city_req') } },
  ]

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append("access_key", "cc95b0bf-5454-4dea-93da-b3f93265b314")
      formData.append("name", data.nom)
      formData.append("email", data.email)
      formData.append("city", data.ville)
      formData.append("message", data.message)
      formData.append("subject", "وصلك ميساج جديد من السيت PINTAPLANA")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        toast.success(t('contact.form.success'), {
          description: t('contact.form.success_desc'),
          duration: 5000,
        })
        reset()
      } else {
        toast.error('Erreur', {
          description: result.message || 'Une erreur est survenue lors de l\'envoi.',
        })
      }
    } catch (error) {
      toast.error('Erreur de connexion', {
        description: 'Veuillez vérifier votre connexion internet et réessayer.',
      })
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#111111] relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E7D32] via-[#FFC107] to-[#2E7D32]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#2E7D32]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FFC107]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} className="block text-[#4CAF50] font-semibold text-sm tracking-widest uppercase">
            {t('contact.subtitle')}
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            {t('contact.title')}
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-4 w-16 h-1 bg-[#FFC107] mx-auto rounded-full" />
          <motion.p variants={fadeUp} className="mt-4 text-gray-400 max-w-lg mx-auto text-sm">
            {t('contact.desc')}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* ── Info & Map — slides in from left ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div className="space-y-8">
              {[
                {
                  icon: MapPin,
                  label: t('contact.address'),
                  lines: [t('contact.info_addr1'), t('contact.info_addr2'), t('contact.info_addr3')],
                },
                {
                  icon: Phone,
                  label: t('contact.phone'),
                  lines: [t('contact.phone_value')],
                },
                {
                  icon: Printer,
                  label: t('contact.fax'),
                  lines: [t('contact.fax_value')],
                },
                {
                  icon: Mail,
                  label: t('contact.email'),
                  lines: [t('contact.info_email')],
                },
                {
                  icon: MessageSquare,
                  label: t('contact.availability'),
                  lines: [t('contact.availability_val1'), t('contact.availability_val2')],
                },
              ].map(({ icon: Icon, label, lines }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 bg-[#2E7D32]/15 border border-[#2E7D32]/20 rounded-sm flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#4CAF50]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{label}</div>
                    {lines.map((line) => <div key={line} className="text-gray-400 text-sm">{line}</div>)}
                  </div>
                </div>
              ))}
            </div>
           
          </motion.div>

          {/* ── Form — slides in from right ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white/5 border border-white/10 rounded-sm p-6 sm:p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                {fields.map((field) => {
                  const Icon = field.icon
                  return (
                    <div key={field.name} className={field.name === 'ville' ? 'sm:col-span-2' : ''}>
                      <label className="block text-gray-300 text-xs font-semibold tracking-wider mb-2 uppercase">
                        {field.label}
                      </label>
                      <div className="relative">
                        <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          {...register(field.name, field.rules)}
                          type={field.type}
                          placeholder={field.placeholder}
                          className={`w-full pl-9 pr-4 py-3 bg-white/5 border rounded-sm text-white text-sm placeholder:text-gray-600 outline-none transition-all duration-200
                            focus:bg-white/8 focus:border-[#2E7D32]
                            ${errors[field.name] ? 'border-red-500' : 'border-white/10 hover:border-white/20'}`}
                        />
                      </div>
                      {errors[field.name] && <p className="mt-1 text-red-400 text-xs">{errors[field.name].message}</p>}
                    </div>
                  )
                })}

                <div className="sm:col-span-2">
                  <label className="block text-gray-300 text-xs font-semibold tracking-wider mb-2 uppercase">{t('contact.form.msg_label')}</label>
                  <div className="relative">
                    <MessageSquare size={14} className="absolute left-3 top-3.5 text-gray-500" />
                    <textarea
                      {...register('message', { required: t('contact.form.msg_req') })}
                      rows={5}
                      placeholder={t('contact.form.msg_placeholder')}
                      className={`w-full pl-9 pr-4 py-3 bg-white/5 border rounded-sm text-white text-sm placeholder:text-gray-600 outline-none transition-all duration-200 resize-none
                        focus:bg-white/8 focus:border-[#2E7D32]
                        ${errors.message ? 'border-red-500' : 'border-white/10 hover:border-white/20'}`}
                    />
                  </div>
                  {errors.message && <p className="mt-1 text-red-400 text-xs">{errors.message.message}</p>}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#2E7D32] hover:bg-[#4CAF50] text-white font-bold text-sm tracking-wider rounded-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('contact.form.sending')}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t('contact.form.send')}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
