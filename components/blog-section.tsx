import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";
import { SvgActionButton } from "@/components/svg-action-button";

export function BlogSection() {
  return (
    <section
      aria-labelledby="blog-section-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-[650px]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#536ba2]">
              FROM THE INOVA JOURNAL
            </p>
            <h2
              id="blog-section-heading"
              className="text-[28px] font-semibold leading-tight tracking-[-0.04em] text-[#101b2a] sm:text-[38px]"
            >
              Insights for better informed care
            </h2>
            <p className="mt-3 max-w-[550px] text-[13px] leading-[1.8] text-[#5e6570]">
              Explore practical information about laboratory testing, diagnostic
              services, and what to expect when you visit Inova.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 self-start text-[12px] font-semibold text-[#273d75] transition-colors hover:text-[#536ba2] sm:self-auto"
          >
            All articles <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog#${post.slug}`}
              className="group min-w-0 rounded-2xl border border-[#e5e8ed] bg-white p-2.5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#cbd3e4] hover:shadow-[0_18px_40px_rgba(16,24,40,0.09)] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#536ba2]"
            >
              <div className="relative aspect-[1.55/1] overflow-hidden rounded-xl bg-[#e9edf2]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <div className="px-3 pb-3 pt-4 sm:px-4 sm:pb-4">
                <p className="text-[9px] font-semibold uppercase tracking-[1.5px] text-[#536ba2]">
                  {post.category}
                </p>
                <h3 className="mt-2 text-[17px] font-semibold leading-snug tracking-[-0.02em] text-[#101b2a] sm:text-[19px]">
                  {post.title}
                </h3>
                <p className="mt-2 text-[12px] leading-[1.75] text-[#667085]">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-[#273d75]">
                  Read article
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <SvgActionButton href="/blog" label="Explore all articles" />
        </div>
      </div>
    </section>
  );
}
