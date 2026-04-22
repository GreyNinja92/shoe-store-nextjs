'use client';

import { useTranslations, useLocale, useFormatter, useNow } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const shoes = [
  { id: 1, name: 'Air Max 90', brand: 'Nike', price: 130, image: 'https://placehold.co/200x200/222/fff?text=Air+Max+90' },
  { id: 2, name: 'Ultraboost', brand: 'Adidas', price: 180, image: 'https://placehold.co/200x200/333/fff?text=Ultraboost' },
  { id: 3, name: 'Classic Leather', brand: 'Reebok', price: 75, image: 'https://placehold.co/200x200/444/fff?text=Classic' },
  { id: 4, name: 'Suede Classic', brand: 'Puma', price: 70, image: 'https://placehold.co/200x200/555/fff?text=Suede' },
  { id: 5, name: 'Chuck Taylor', brand: 'Converse', price: 60, image: 'https://placehold.co/200x200/666/fff?text=Chuck+Taylor' },
  { id: 6, name: 'Old Skool', brand: 'Vans', price: 65, image: 'https://placehold.co/200x200/777/fff?text=Old+Skool' },
];

const localeOptions = ['en', 'fr', 'es', 'de', 'ja', 'pt', 'zh', 'ar'] as const;

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const format = useFormatter();
  const now = useNow();
  const router = useRouter();
  const [cart, setCart] = useState<typeof shoes>([]);

  const switchLocale = (newLocale: string) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;
    router.refresh();
  };

  const total = cart.reduce((sum, s) => sum + s.price, 0);

  const formatPrice = (price: number) =>
    format.number(price, { style: 'currency', currency: 'USD' });

  return (
    <>
      <header style={{ background: '#1a1a2e', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.4rem', margin: 0 }}>{t('header.title')}</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select
            value={locale}
            onChange={(e) => switchLocale(e.target.value)}
            style={{ padding: '0.3rem 0.5rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
            aria-label="Language"
          >
            {localeOptions.map((loc) => (
              <option key={loc} value={loc}>{t(`language.${loc}`)}</option>
            ))}
          </select>
          <span style={{ background: '#e94560', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.85rem' }}>
            {t('header.cart')}: {t('shop.itemCount', { count: cart.length })}
          </span>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>{t('shop.heading')}</h2>
        <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '1rem' }}>
          {t('formats.lastUpdated', { date: now })}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {shoes.map((s) => (
            <div key={s.id} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <img src={s.image} alt={s.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '1rem', margin: '0 0 0.25rem' }}>{s.name}</h3>
                <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>{s.brand}</p>
                <div style={{ fontWeight: 'bold', color: '#e94560', margin: '0.5rem 0' }}>{formatPrice(s.price)}</div>
                <button
                  onClick={() => setCart([...cart, s])}
                  style={{ background: '#1a1a2e', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', width: '100%' }}
                >
                  {t('shop.addToCart')}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', marginTop: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2>{t('cart.heading')}</h2>
          {cart.length === 0 ? (
            <p style={{ padding: '1rem 0', color: '#999' }}>{t('cart.empty')}</p>
          ) : (
            cart.map((s, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                <span>{s.name} - {formatPrice(s.price)}</span>
                <button
                  onClick={() => setCart(cart.filter((_, idx) => idx !== i))}
                  style={{ background: '#e94560', color: 'white', border: 'none', padding: '0.3rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  {t('cart.remove')}
                </button>
              </div>
            ))
          )}
          {total > 0 && (
            <div style={{ textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem' }}>
              {t('cart.total')}: {formatPrice(total)}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
