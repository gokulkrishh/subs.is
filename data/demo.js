const demoData = [
  {
    id: '8f2b-d0a486e6d41c',
    user_id: 'a28ea69b01fb',
    name: 'Apple TV',
    cost: '99',
    billing_date: '2023-12-31',
    url: 'https://tv.apple.com',
    payment_cycle: 'monthly',
    active: true,
    color: '#b1aab5',
    notes: '',
    notify: false,
    created_at: '2024-03-30T09:42:30.459603+00:00',
    updated_at: '2024-03-31T04:11:54.921491+00:00',
    renewal_date: new Date(`${new Date().getFullYear()}-04-30`).toISOString(),
  },
  {
    id: 'b1d1-907ae52436d4',
    user_id: 'a28ea69b01fb',
    name: 'Netflix',
    cost: '0',
    billing_date: '2022-12-02',
    url: 'https://netflix.com',
    payment_cycle: 'monthly',
    active: true,
    color: '#da693b',
    notes: '',
    notify: false,
    created_at: '2024-03-30T09:47:12.213566+00:00',
    updated_at: '2024-03-31T03:53:51.05452+00:00',
    renewal_date: new Date().toISOString(),
  },
  {
    id: '9720-70d4bf2e1e15',
    user_id: 'a28ea69b01fb',
    name: 'Airtel',
    cost: '5100',
    billing_date: '2023-01-02',
    url: 'https://airtel.com',
    payment_cycle: 'monthly',
    active: true,
    color: '#a682da',
    notes: 'Via Airtel internet!',
    notify: false,
    created_at: '2024-03-30T09:46:26.325229+00:00',
    updated_at: '2024-03-31T03:53:45.434143+00:00',
    renewal_date: new Date(
      `${new Date().getFullYear()}-${((new Date().getMonth() + 1) % 12) + 1}-${new Date().getDate() - 1}`,
    ).toISOString(),
  },
  {
    id: '9c45-982bddf46e5e',
    user_id: 'a28ea69b01fb',
    name: 'Youtube',
    cost: '169',
    billing_date: '2024-03-14',
    url: 'https://youtube.com',
    payment_cycle: 'monthly',
    active: true,
    color: '#15e27c',
    notes: '',
    notify: false,
    created_at: '2024-03-31T02:30:07.060881+00:00',
    updated_at: '2024-03-31T03:54:25.013592+00:00',
    renewal_date: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-14`).toISOString(),
  },
  {
    id: '9a3a-b928582fa091',
    user_id: 'a28ea69b01fb',
    name: 'Apple iCloud',
    cost: '219',
    billing_date: '2023-05-19',
    url: 'https://icloud.com',
    payment_cycle: 'monthly',
    active: true,
    color: '#a7403e',
    notes: '',
    notify: false,
    created_at: '2024-03-30T09:47:46.199135+00:00',
    updated_at: '2024-03-31T03:54:29.257785+00:00',
    renewal_date: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-19`).toISOString(),
  },
  {
    id: '92ad-1f2e77c7fc2c',
    user_id: 'a28ea69b01fb',
    name: 'Vercel',
    cost: '1725',
    billing_date: '2023-02-22',
    url: 'https://vercel.com',
    payment_cycle: 'monthly',
    active: true,
    color: '#9a9ac7',
    notes: '',
    notify: true,
    created_at: '2024-03-30T09:48:14.455039+00:00',
    updated_at: '2024-03-31T03:54:34.096089+00:00',
    renewal_date: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-22`).toISOString(),
  },
  {
    id: 'b037-a3acb49becf9',
    user_id: 'a28ea69b01fb',
    name: 'Amazon Prime',
    cost: '1499',
    billing_date: '2023-06-15',
    url: 'https://amazon.in',
    payment_cycle: 'yearly',
    active: true,
    color: '#6d8f02',
    notes: 'E-Mandate is enabled, decide on next billing.\t',
    notify: false,
    created_at: '2024-03-30T09:48:48.033617+00:00',
    updated_at: '2024-03-31T03:53:57.407636+00:00',
    renewal_date: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 2}-15`).toISOString(),
  },
  {
    id: '963b-d60ab15f9c2b',
    user_id: 'a28ea69b01fb',
    name: 'Spotify',
    cost: '1189',
    billing_date: '2023-11-26',
    url: 'https://spotify.com',
    payment_cycle: 'yearly',
    active: true,
    color: '#397b89',
    notes: '',
    notify: false,
    created_at: '2024-03-30T09:49:18.668608+00:00',
    updated_at: '2024-03-31T03:54:02.178775+00:00',
    renewal_date: new Date(`${new Date().getFullYear()}-11-26`).toISOString(),
  },
  {
    id: 'a777-01fbf99fbde0',
    user_id: 'a28ea69b01fb',
    name: 'Hotstar',
    cost: '1499',
    billing_date: '2023-12-06',
    url: 'https://hotstar.com',
    payment_cycle: 'yearly',
    active: true,
    color: '#5a22b4',
    notes: '',
    notify: false,
    created_at: '2024-03-30T09:49:41.018434+00:00',
    updated_at: '2024-03-31T03:54:06.71565+00:00',
    renewal_date: new Date(`${new Date().getFullYear()}-12-15`).toISOString(),
  },
  {
    id: '811c-bc6ae2dd657c',
    user_id: 'a28ea69b01fb',
    name: '1Password',
    cost: '4903',
    billing_date: '2022-12-08',
    url: 'https://1password.com/',
    payment_cycle: 'yearly',
    active: true,
    color: '#95b54d',
    notes: '',
    notify: false,
    created_at: '2024-03-30T09:50:13.324965+00:00',
    updated_at: '2024-03-31T03:54:11.385757+00:00',
    renewal_date: new Date(`${new Date().getFullYear()}-12-08`).toISOString(),
  },
  {
    id: 'a098-5dca19c124a6',
    user_id: 'a28ea69b01fb',
    name: 'Leetcode',
    cost: '10606.36',
    billing_date: '2024-01-03',
    url: 'https://leetcode.com',
    payment_cycle: 'yearly',
    active: true,
    color: '#daad5f',
    notes: '',
    notify: false,
    created_at: '2024-03-31T04:00:52.771998+00:00',
    updated_at: '2024-03-31T04:00:52.771998+00:00',
    renewal_date: new Date(`${new Date().getFullYear() + 1}-01-03`).toISOString(),
  },
  {
    id: '902f-61cd8db4fdc9',
    user_id: 'a28ea69b01fb',
    name: 'Twitter',
    cost: '6800',
    billing_date: '2023-02-14',
    url: 'https://x.com',
    payment_cycle: 'yearly',
    active: true,
    color: '#4ffb0f',
    notes: '',
    notify: false,
    created_at: '2024-03-30T09:50:47.409531+00:00',
    updated_at: '2024-03-31T03:54:15.563917+00:00',
    renewal_date: new Date(`${new Date().getFullYear() + 1}-02-04`).toISOString(),
  },
  {
    id: '8f47-d6b55c3a9cdd',
    user_id: 'a28ea69b01fb',
    name: 'Bookmark It.',
    cost: '2350.36',
    billing_date: '2023-02-22',
    url: 'https://bmrk.cc',
    payment_cycle: 'yearly',
    active: true,
    color: '#86b9c5',
    notes: '',
    notify: false,
    created_at: '2024-03-30T09:51:11.886003+00:00',
    updated_at: '2024-03-31T03:54:20.435422+00:00',
    renewal_date: new Date(`${new Date().getFullYear() + 1}-02-22`).toISOString(),
  },
];

export default demoData;