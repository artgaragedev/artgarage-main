import { redirect } from 'next/navigation';

export default async function AdditionalServicesPage({
  params,
  searchParams
}: {
  params: any;
  searchParams?: any;
}) {
  const p = await params;
  const sp = searchParams ? await searchParams : undefined;
  const locale: string = p?.locale ?? 'ru';
  const service = sp?.service;
  const suffix = typeof service === 'string'
    ? `?service=${service}`
    : Array.isArray(service) && service.length > 0
      ? `?service=${service[0]}`
      : '';
  redirect(`/${locale}${suffix}`);
}