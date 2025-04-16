import Typography from '@/components/typography/Typography';
import { Star } from 'lucide-react';

interface ProductsViewsGridProps {
  products: Api.Products;
}

export default function ProductsViewsGrid({ products }: ProductsViewsGridProps) {
  return (
    <section>
      <div className="grid grid-cols-4 gap-1 max-md:grid-cols-2">
        {products.products.map((product) => (
          <div key={product.id} className="flex flex-col shadow-md rounded-lg my-4 p-4 bg-white">
            <img
              src={product.thumbnail}
              alt={product.title}
              width={300}
              height={300}
              className="object-cover w-full max-w-[300px]"
            />
            <div className="p-2 flex-1 min-w-[0px]">
              <Typography as="h2" className="font-semibold text-[18px] max-md:text-[16px]">
                [상품명] {product.title}
              </Typography>
              <Typography as="p" className="tracking-tighter border-l-3 border-gray-300 pl-3 py-1 mt-2 max-md:truncate">
                {product.description}
              </Typography>
              <div className="flex items-center gap-1 mt-2">
                <Star fill="#f0c848" strokeWidth={0} size={20} />{' '}
                <Typography as="p" className="text-gray-500 text-sm">
                  {product.rating.toFixed(1)} / 5.0
                </Typography>
              </div>
              <Typography as="p" className="text-gray-500 text-sm mt-2">
                후기: {product.reviews.length}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
