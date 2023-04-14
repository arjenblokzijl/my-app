import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch(
    `https://heeringportal.directus.app/items/blogs?fields=title,id,category.name,slug,image.*,meta.*,is_highlighted&filter[status]=published&limit=12&meta=*&page=1&sort=-date`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function Posts(props: any) {
  return (
    <div className="container py-20 mx-auto">
      <h1 className="mb-8 text-3xl">Posts</h1>

      <div className="grid gap-8">
        {props.data.data.map((item: any) => (
          <Link
            key={item.id}
            href={`/posts/${item.slug}`}
            className="transition-transform hover:scale-105"
          >
            <div>
              <h1 className="text-lg font-medium">{item.title}</h1>
              <p className="font-mono text-sm text-gray-500">
                {item.category.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
