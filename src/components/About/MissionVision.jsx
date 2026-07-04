import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function MissionVision() {
  const values = [
    {
      title: 'Sứ mệnh',
      description: 'Mang lại nền tảng chia sẻ nội dung chất lượng cao, dễ sử dụng, kết nối những người đam mê viết lách với độc giả trên toàn thế giới.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=400'
    },
    {
      title: 'Tầm nhìn',
      description: 'Trở thành cộng đồng blog hàng đầu, nơi kiến thức và cảm hứng được lan tỏa mạnh mẽ, góp phần xây dựng một xã hội học hỏi không ngừng.',
      image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=600&h=400'
    },
    {
      title: 'Giá trị cốt lõi',
      description: 'Tôn trọng sự đa dạng, đề cao tính xác thực và luôn đặt trải nghiệm của người dùng lên hàng đầu trong mọi quyết định phát triển.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600&h=400'
    },
    {
      title: 'Trách nhiệm',
      description: 'Xây dựng một môi trường mạng an toàn, lành mạnh, chung tay đóng góp những giá trị tích cực cho cộng đồng toàn cầu.',
      image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=600&h=400'
    }
  ];

  return (
    <section className="w-full bg-muted/50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Sứ mệnh & Giá trị</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Những điều dẫn lối cho mọi hoạt động của VBlog.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((item, index) => (
            <Card key={index} className="border-none shadow-md transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-card p-0 overflow-hidden">
              <div className="w-full h-48">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-t-xl" />
              </div>
              <CardHeader className="pt-6">
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
