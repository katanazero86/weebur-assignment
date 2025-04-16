import Typography from '@/components/typography/Typography';

export default function NoDataToLoad() {
  return (
    <Typography as="p" className="text-gray-500 text-xl text-center py-10">
      더 이상 불러올 수 없습니다.
    </Typography>
  );
}
