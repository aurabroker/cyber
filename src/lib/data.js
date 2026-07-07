/* Treści strony — Aura Consulting · Ubezpieczenie Cyber */

export const coverage = [
	{
		n: '01',
		name: 'Ransomware & Wymuszenia',
		text: 'Pokrycie okupu, koszty negocjatora kryzysowego, pełne przywrócenie systemów i danych po ataku szyfrującym.'
	},
	{
		n: '02',
		name: 'Odpowiedzialność za Dane',
		text: 'Ochrona prawna i odszkodowawcza po wycieku danych osobowych klientów lub pracowników. RODO-ready.'
	},
	{
		n: '03',
		name: 'Przerwa w Działalności',
		text: 'Utracony zysk i koszty stałe gdy systemy nie działają — od pierwszej godziny przestoju operacyjnego.'
	},
	{
		n: '04',
		name: 'Reagowanie na Incydent',
		text: '24/7 dostęp do zespołu forensic, PR kryzysowy, obsługa prawna i powiadamianie ofiar wycieku danych.'
	},
	{
		n: '05',
		name: 'Cyberprzestępczość Finansowa',
		text: 'Phishing CEO, przelewy na fałszywe rachunki, manipulacja fakturami — straty bezpośrednie pokryte.'
	},
	{
		n: '06',
		name: 'Kary Regulacyjne NIS2',
		text: 'Koszty obrony i część kar nakładanych przez UODO, KNF lub unijnych regulatorów NIS2 / DORA.'
	}
];

export const threats = [
	{
		n: '01',
		title: 'Phishing i spear-phishing',
		desc: '90% naruszeń zaczyna się od wiadomości e-mail. Ataki celowane w konkretne osoby w firmie.'
	},
	{
		n: '02',
		title: 'Ransomware',
		desc: 'Szyfrowanie danych i żądanie okupu — średnio 3 tygodnie przestoju bez sprawnego backupu.'
	},
	{
		n: '03',
		title: 'Ataki na łańcuch dostaw',
		desc: 'Kompromitacja dostawcy oprogramowania — jeden atak uderza w setki firm jednocześnie.'
	},
	{
		n: '04',
		title: 'Business Email Compromise',
		desc: 'Podszywanie się pod prezesa lub CFO — zlecenia przelewów na konta przestępców.'
	},
	{
		n: '05',
		title: 'Naruszenie danych / insider',
		desc: 'Wycieki przez pracowników — celowe lub przez zaniedbanie. RODO: do 20M EUR kary.'
	}
];

export const processSteps = [
	{
		n: '01',
		title: 'Analiza Ryzyka',
		desc: 'Mapujemy systemy, dane i ekspozycję. Identyfikujemy luki, które polisa musi pokryć.'
	},
	{
		n: '02',
		title: 'Dobór Pokrycia',
		desc: "Na rynku Lloyd's i polskim dobieramy program dopasowany do branży, skali i budżetu."
	},
	{
		n: '03',
		title: 'Wdrożenie Polisy',
		desc: 'Negocjujemy warunki, weryfikujemy klauzule wyłączeń i finalizujemy kontrakt.'
	},
	{
		n: '04',
		title: 'Wsparcie 24/7',
		desc: 'Jesteśmy z tobą w momencie incydentu — od zgłoszenia po zamknięcie szkody i wypłatę.'
	}
];

export const stats = [
	{
		n: '4,4M',
		desc: 'USD — średni koszt naruszenia danych',
		source: 'IBM Cost of Data Breach 2024'
	},
	{
		n: '72h',
		desc: 'Obowiązkowy czas zgłoszenia incydentu',
		source: 'RODO Art. 33 → UODO'
	},
	{
		n: '94%',
		desc: 'Polskich firm doświadczyło incydentu cyber',
		source: 'KPMG Barometr 2024'
	}
];

export const tickerItems = [
	{ red: true, text: 'RANSOMWARE · Atak na sieć szpitala · Niemcy · 3 tygodnie przestoju' },
	{ red: false, text: 'PHISHING · Utrata 2,1M EUR · Firma logistyczna · Polska 2024' },
	{ red: true, text: 'DATA BREACH · 430 000 rekordów klientów · Retailer · Czechy' },
	{ red: false, text: 'BEC FRAUD · CEO Scam · Straty 890K PLN · Warszawa · Q3 2024' },
	{ red: true, text: 'SUPPLY CHAIN · Kompromitacja SaaS · 140 firm dotkniętych jednocześnie' },
	{ red: false, text: 'DDoS · 48h przestoju · E-commerce · Black Friday 2023' },
	{ red: true, text: 'RANSOMWARE · Kancelaria prawna · 3TB zaszyfrowanych danych klientów' },
	{ red: false, text: 'INSIDER THREAT · Wyciek bazy klientów · Sektor finansowy · Kraków' },
	{ red: true, text: 'CRYPTOJACKING · Infrastruktura chmurowa · 220K EUR strat energetycznych' },
	{ red: false, text: 'KARA RODO · UODO · 1,1M PLN nałożone na administratora danych osobowych' },
	{ red: true, text: 'APT41 · Atak na infrastrukturę krytyczną · Europa Środkowa 2024' },
	{ red: false, text: 'NIS2 · Nowe wymogi bezpieczeństwa dla operatorów usług kluczowych' }
];

export const partners = [
	{ name: 'CFC Underwriting', sub: "LLOYD'S OF LONDON SYNDICATE", accent: true },
	{ name: 'KNF', sub: 'LICENCJA OD 2013', accent: false },
	{ name: 'NIS2 / DORA', sub: 'COMPLIANCE READY', accent: false },
	{ name: 'RODO / UODO', sub: 'DATA PROTECTION', accent: false }
];
