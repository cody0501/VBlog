import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden bg-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] py-20 lg:py-32">

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
            Về chúng tôi
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight leading-[1.2] sm:text-5xl md:text-6xl lg:text-7xl text-black dark:text-white">
            Nơi chia sẻ Đam Mê <br className="hidden sm:block" />
            và Kiến Thức
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Chúng tôi tin rằng mọi câu chuyện đều có giá trị. VBlog được tạo ra để trở thành không gian mở, nơi bất kỳ ai cũng có thể đọc, viết và chia sẻ góc nhìn của riêng mình về cuộc sống, công nghệ và nghệ thuật.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/posts">Đọc bài viết</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/contact">Liên hệ ngay</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
