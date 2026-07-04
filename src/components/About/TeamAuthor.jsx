import React from 'react';
import { Globe, Mail, Briefcase } from 'lucide-react';

export default function TeamAuthor() {
  const team = [
    {
      name: 'Vũ Nguyễn Quốc Lâm',
      role: 'Backend',
      socials: { twitter: '#', github: '#', linkedin: '#' }
    },
    {
      name: 'Lê Hiệp Phát',
      role: 'Backend',
      socials: { twitter: '#', github: '#', linkedin: '#' }
    },
    {
      name: 'Nguyễn Thành Danh',
      role: 'Frontend',
      socials: { twitter: '#', github: '#', linkedin: '#' }
    },
    {
      name: 'Khưu Trần Duy Tuấn',
      role: 'Frontend',
      socials: { twitter: '#', github: '#', linkedin: '#' }
    },
    {
      name: 'Nguyễn Ngọc Duy',
      role: 'Frontend',
      socials: { twitter: '#', github: '#', linkedin: '#' }
    },
    {
      name: 'Huỳnh Phương Đông',
      role: 'Frontend',
      socials: { twitter: '#', github: '#', linkedin: '#' }
    }
  ];

  return (
    <section className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Đội ngũ của chúng tôi</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Những con người đứng sau sự thành công của VBlog.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center justify-center rounded-2xl bg-card p-6 shadow-sm border transition-colors hover:border-primary/50 text-center">
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-primary font-medium mb-6">{member.role}</p>
              <div className="flex gap-4">
                <a href={member.socials.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
                <a href={member.socials.github} className="text-muted-foreground hover:text-primary transition-colors">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Website</span>
                </a>
                <a href={member.socials.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                  <Briefcase className="h-5 w-5" />
                  <span className="sr-only">Portfolio</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}