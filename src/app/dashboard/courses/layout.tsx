import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Courses'
};

export default function CoursesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
