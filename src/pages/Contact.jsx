import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Mail, Phone, MapPin, Clock, Send, Globe } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Field, FieldLabel } from '~/components/ui/field'
import { FieldErrorAlert } from '~/components/FieldErrorAlert'
import { Spinner } from '~/components/ui/spinner'
import { sendContactMessageAPI } from '~/apis'
import { FIELD_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/utils/validators'

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      await sendContactMessageAPI(data)
      toast.success('Gửi tin nhắn liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất có thể.', {
        position: 'bottom-right',
        theme: 'colored'
      })
      reset()
    } catch (error) {
      console.error('Contact submission error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-[#e7e3dc] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Form liên hệ bên trái */}
          <div className="p-8 sm:p-12 border-b md:border-b-0 md:border-r border-[#e7e3dc]">
            <h2 className="text-3xl font-bold text-[#2c2520] mb-8">VBlog - Liên hệ</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Field>
                <FieldLabel>Tên của bạn</FieldLabel>
                <Input
                  type="text"
                  placeholder="Nguyễn Văn A"
                  {...register('name', { required: FIELD_REQUIRED_MESSAGE })}
                />
                <FieldErrorAlert error={errors.name} />
              </Field>

              <Field>
                <FieldLabel>Địa chỉ Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  {...register('email', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                  })}
                />
                <FieldErrorAlert error={errors.email} />
              </Field>

              <Field>
                <FieldLabel>Tiêu đề</FieldLabel>
                <Input
                  type="text"
                  placeholder="Tôi muốn hợp tác..."
                  {...register('subject', { required: FIELD_REQUIRED_MESSAGE })}
                />
                <FieldErrorAlert error={errors.subject} />
              </Field>

              <Field>
                <FieldLabel>Nội dung tin nhắn</FieldLabel>
                <textarea
                  className="w-full min-h-[120px] p-3 rounded-lg border border-[#e7e3dc] focus:outline-none focus:border-[#704f38] transition-colors resize-y bg-[#fdfbf7]"
                  placeholder="Nhập nội dung tin nhắn của bạn tại đây..."
                  {...register('message', { required: FIELD_REQUIRED_MESSAGE })}
                />
                <FieldErrorAlert error={errors.message} />
              </Field>

              <Button type="submit" className="w-full bg-[#704f38] hover:bg-[#5a3f2c] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2" disabled={isSubmitting}>
                {isSubmitting ? <Spinner className="w-5 h-5 text-white" /> : <Send className="w-4 h-4" />}
                Gửi tin nhắn
              </Button>
            </form>
          </div>

          {/* Thông tin liên hệ bên phải */}
          <div className="p-8 sm:p-12 bg-[#fdfbf7] flex flex-col justify-between">
            <div className="space-y-8">
              <h3 className="text-xl font-semibold text-[#2c2520]">Thông tin của chúng tôi</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#f4f1eb] text-[#704f38] rounded-xl">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2c2520] mb-0.5">Địa chỉ</h4>
                    <p className="text-sm text-[#70655d]">123 Đường ABC, Quận 1, TP.HCM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#f4f1eb] text-[#704f38] rounded-xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2c2520] mb-0.5">Điện thoại</h4>
                    <p className="text-sm text-[#70655d]">0123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#f4f1eb] text-[#704f38] rounded-xl">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2c2520] mb-0.5">Email</h4>
                    <p className="text-sm text-[#70655d]">contact@vblog.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-[#f4f1eb] text-[#704f38] rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2c2520] mb-0.5">Thời gian làm việc</h4>
                    <p className="text-sm text-[#70655d]">Thứ Hai - Thứ Sáu: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phần mạng xã hội an toàn chỉ dùng Globe */}
            <div className="pt-6 border-t border-[#e7e3dc] mt-8">
              <h4 className="text-xs font-semibold text-[#2c2520] uppercase tracking-wider mb-3">Theo dõi chúng tôi</h4>
              <div className="flex items-center gap-4">
                <a href="https://vblog.com" target="_blank" rel="noreferrer" className="p-2 bg-[#fdfbf7] border border-[#e7e3dc] hover:border-[#704f38] text-[#70655d] hover:text-[#704f38] rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage