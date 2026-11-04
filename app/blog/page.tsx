import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { blogPosts } from "@/lib/blog-posts";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Health and Diagnostic Insights",
  description:
    "Read practical information about laboratory testing, diagnostic services, and patient care from Inova Labs Diagnostic.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-[#f6f8fb]">
        <section className="border-b border-[#e3e7ee] bg-white px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1440px]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#536ba2]">
              THE INOVA JOURNAL
            </p>
            <h1 className="max-w-[760px] text-[34px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#101b2a] sm:text-[52px]">
              Health and diagnostic insights
            </h1>
            <p className="mt-4 max-w-[620px] text-[14px] leading-[1.8] text-[#5e6570]">
              Clear, useful information about laboratory testing, diagnostic
              services, and the patient experience at Inova.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-[1440px] space-y-6 px-5 py-10 sm:space-y-8 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          {blogPosts.map((post, index) => (
            <article
              id={post.slug}
              key={post.slug}
              className={`grid overflow-hidden rounded-2xl border border-[#e5e8ed] bg-white md:min-h-[330px] md:grid-cols-2 ${index % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative min-h-[220px] bg-[#e9edf2] sm:min-h-[300px]">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <p className="text-[9px] font-semibold uppercase tracking-[1.5px] text-[#536ba2]">
                  {post.category}
                </p>
                <h2 className="mt-2 text-[23px] font-semibold leading-tight tracking-[-0.03em] text-[#101b2a] sm:text-[30px]">
                  {post.title}
                </h2>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#667085]">
                  {post.excerpt}
                </p>
                <div className="mt-4 space-y-3 text-[12px] leading-[1.8] text-[#4d5663] sm:text-[13px]">
                  {post.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
