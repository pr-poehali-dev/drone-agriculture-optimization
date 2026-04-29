import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/224cca5f-68dc-41aa-8e6c-2eb58749f3cd/files/f4cef7d7-d845-434a-993f-cd60b0e1ee7e.jpg";

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#advantages", label: "Преимущества" },
    { href: "#drones", label: "Дроны" },
    { href: "#capabilities", label: "Возможности" },
    { href: "#works", label: "Работы" },
    { href: "#about", label: "О компании" },
    { href: "#order", label: "Заявка" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-agro-dark/95 backdrop-blur-md border-b border-agro-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neon-green rounded-sm flex items-center justify-center animate-pulse-green">
            <Icon name="Plane" size={16} className="text-agro-dark rotate-45" />
          </div>
          <span className="font-bebas text-2xl text-white tracking-widest">АгроДрон</span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-400 hover:text-neon-green transition-colors duration-200 font-golos tracking-wide"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#order"
          className="hidden lg:block bg-neon-green text-agro-dark font-golos font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-neon-lime transition-all duration-200 hover:scale-105"
        >
          Рассчитать стоимость
        </a>

        <button className="lg:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-agro-dark border-b border-agro-border px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-neon-green transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#order"
            className="bg-neon-green text-agro-dark font-semibold text-sm px-5 py-2.5 rounded-lg text-center"
            onClick={() => setMenuOpen(false)}
          >
            Рассчитать стоимость
          </a>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden noise-bg grid-bg">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
      style={{ backgroundImage: `url(${HERO_IMAGE})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-agro-darker/60 via-agro-dark/40 to-agro-dark" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent" />

    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="h-px w-12 bg-neon-green" />
          <span className="text-neon-green font-golos text-sm tracking-[0.2em] uppercase">Точное земледелие нового поколения</span>
        </div>

        <h1
          className="font-bebas text-[clamp(4rem,12vw,10rem)] leading-none text-white mb-4 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Обработка полей{" "}
          <span className="text-neon-green glow-neon">дронами</span>
        </h1>

        <p
          className="font-golos text-lg text-gray-300 max-w-2xl mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          Профессиональная аэрообработка сельскохозяйственных угодий. Внесение удобрений, пестицидов и биологических препаратов с точностью до сантиметра. Быстро, выгодно, безопасно.
        </p>

        <div
          className="flex flex-wrap gap-4 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href="#order"
            className="bg-neon-green text-agro-dark font-golos font-bold text-base px-8 py-4 rounded-xl hover:bg-neon-lime transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(74,255,107,0.4)] flex items-center gap-2"
          >
            <Icon name="Calculator" size={18} />
            Рассчитать стоимость
          </a>
          <a
            href="#capabilities"
            className="border border-agro-border text-white font-golos text-base px-8 py-4 rounded-xl hover:border-neon-green/50 transition-all duration-200 flex items-center gap-2 hover:bg-white/5"
          >
            <Icon name="Play" size={18} className="text-neon-green" />
            Что умеют дроны
          </a>
        </div>

        <div
          className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-agro-border animate-fade-up max-w-xl"
          style={{ animationDelay: "0.8s" }}
        >
          {[
            { value: "500+", label: "га в сутки" },
            { value: "3×", label: "быстрее техники" },
            { value: "98%", label: "точность покрытия" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-bebas text-4xl text-neon-green">{s.value}</div>
              <div className="font-golos text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="absolute bottom-10 right-10 animate-float hidden lg:block">
      <div className="w-24 h-24 border border-neon-green/20 rounded-full flex items-center justify-center">
        <div className="w-16 h-16 border border-neon-green/40 rounded-full flex items-center justify-center">
          <Icon name="Plane" size={28} className="text-neon-green rotate-45 animate-pulse-green" />
        </div>
      </div>
    </div>
  </section>
);

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const c1 = useCounter(500, 2000, started);
  const c2 = useCounter(15, 2000, started);
  const c3 = useCounter(30, 2000, started);
  const c4 = useCounter(98, 2000, started);

  return (
    <div ref={ref} className="bg-neon-green py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: c1, suffix: "+", label: "га обработано за сутки", icon: "Layers" },
            { value: c2, suffix: "+", label: "видов культур обрабатываем", icon: "Leaf" },
            { value: c3, suffix: "%", label: "экономия воды vs наземная техника", icon: "Droplets" },
            { value: c4, suffix: "%", label: "точность обработки поля", icon: "Target" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <Icon name={s.icon} size={28} className="text-agro-dark mx-auto mb-2 opacity-60" />
              <div className="font-bebas text-5xl text-agro-dark">
                {s.value}{s.suffix}
              </div>
              <div className="font-golos text-sm text-agro-dark/70 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdvantagesSection = () => {
  const advantages = [
    {
      icon: "Zap",
      title: "Скорость обработки",
      desc: "До 500 га в сутки — в 3–5 раз быстрее наземной техники. Идеально для срочных обработок в критические фазы роста.",
    },
    {
      icon: "Crosshair",
      title: "Точность нанесения",
      desc: "GPS-навигация с точностью до 2 см. Равномерное перекрытие 98%+. Нет пропусков и перерасхода препаратов.",
    },
    {
      icon: "TrendingDown",
      title: "Экономия ресурсов",
      desc: "На 30% меньше воды и препаратов по сравнению с наземной техникой. Прямое снижение себестоимости урожая.",
    },
    {
      icon: "Shield",
      title: "Безопасность посевов",
      desc: "Нет уплотнения почвы и колеи. Не повреждает всходы. Работает на переувлажнённых полях, куда трактор не пройдёт.",
    },
    {
      icon: "Clock",
      title: "Работа 24/7",
      desc: "Дроны работают в любое время суток и при ветре до 8 м/с. Ночные обработки в жаркое время — без испарения препаратов.",
    },
    {
      icon: "BarChart2",
      title: "Аналитика и отчёты",
      desc: "После каждой обработки — детальный отчёт с треком полёта, расходом, картой покрытия. Полная прозрачность.",
    },
  ];

  return (
    <section id="advantages" className="py-24 bg-agro-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-green" />
            <span className="text-neon-green font-golos text-sm tracking-[0.2em] uppercase">Почему мы</span>
          </div>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none">
            Преимущества <span className="text-neon-green">дронирования</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((a, i) => (
            <div
              key={a.title}
              className="section-reveal glow-box-hover border border-agro-border bg-agro-card rounded-2xl p-6 transition-all duration-300 hover:border-neon-green/30 group"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-neon-green/10 border border-neon-green/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-neon-green/20 transition-colors">
                <Icon name={a.icon} size={22} className="text-neon-green" />
              </div>
              <h3 className="font-golos font-bold text-white text-lg mb-2">{a.title}</h3>
              <p className="font-golos text-gray-400 text-sm leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DronesSection = () => {
  const drones = [
    {
      name: "AgriBot X40",
      type: "Опрыскиватель",
      payload: "40 л",
      area: "120 га/час",
      speed: "8 м/с",
      features: ["GPS RTK", "Радар уклонений", "Авторегулировка давления"],
      badge: "Топ продаж",
    },
    {
      name: "SkyFarm Pro 20",
      type: "Опрыскиватель",
      payload: "20 л",
      area: "60 га/час",
      speed: "7 м/с",
      features: ["Ночной режим", "Авто-калибровка", "ИК-датчики высоты"],
      badge: null,
    },
    {
      name: "GrainSeeder S10",
      type: "Высевающий",
      payload: "10 кг",
      area: "30 га/час",
      speed: "6 м/с",
      features: ["Центробежный рассев", "Регулировка потока", "Покрытие 10 м"],
      badge: "Новинка",
    },
    {
      name: "Scout Vision",
      type: "Мониторинг",
      payload: "RGB + NIR",
      area: "200 га/час",
      speed: "12 м/с",
      features: ["Мультиспектр", "NDVI карты", "3D рельеф"],
      badge: null,
    },
  ];

  return (
    <section id="drones" className="py-24 bg-agro-darker grid-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-green" />
            <span className="text-neon-green font-golos text-sm tracking-[0.2em] uppercase">Техника</span>
          </div>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none">
            Наш парк <span className="text-neon-green">дронов</span>
          </h2>
          <p className="font-golos text-gray-400 mt-4 max-w-2xl">
            Современный флот агродронов для любых задач: от точечного опрыскивания до мониторинга тысяч гектаров
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drones.map((d, i) => (
            <div
              key={d.name}
              className="section-reveal border border-agro-border bg-agro-card rounded-2xl p-6 glow-box-hover transition-all duration-300 hover:border-neon-green/30 group relative overflow-hidden"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {d.badge && (
                <span className="absolute top-4 right-4 bg-neon-green text-agro-dark text-xs font-bold px-3 py-1 rounded-full font-golos">
                  {d.badge}
                </span>
              )}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-neon-green/10 border border-neon-green/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-neon-green/20 transition-colors">
                  <Icon name="Plane" size={26} className="text-neon-green rotate-45" />
                </div>
                <div>
                  <div className="text-neon-green text-xs font-golos tracking-widest uppercase mb-1">{d.type}</div>
                  <h3 className="font-golos font-bold text-white text-xl">{d.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-agro-border">
                {[
                  { label: "Загрузка", val: d.payload },
                  { label: "Площадь/ч", val: d.area },
                  { label: "Скорость", val: d.speed },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-golos text-xs text-gray-500 mb-1">{s.label}</div>
                    <div className="font-golos font-bold text-white text-sm">{s.val}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {d.features.map((f) => (
                  <span key={f} className="text-xs font-golos text-neon-green border border-neon-green/20 rounded-full px-3 py-1 bg-neon-green/5">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CapabilitiesSection = () => {
  const caps = [
    { icon: "Droplets", title: "Внесение СЗР", desc: "Гербициды, фунгициды, инсектициды, регуляторы роста. Точное нанесение без дрейфа и перерасхода." },
    { icon: "Sprout", title: "Подкормка удобрениями", desc: "Жидкие и гранулированные удобрения. Дифференцированное внесение по картам предписаний NDVI." },
    { icon: "Scan", title: "Мониторинг посевов", desc: "Мультиспектральная съёмка, построение NDVI-карт, выявление стресса, болезней, сорняков на ранней стадии." },
    { icon: "Wind", title: "Биологическая защита", desc: "Внесение энтомофагов и биопрепаратов для экологического земледелия. Совместимо с органическим производством." },
    { icon: "Map", title: "Картографирование", desc: "3D-модели рельефа, ортофотопланы высокого разрешения, цифровые модели полей для точного земледелия." },
    { icon: "Leaf", title: "Высев семян", desc: "Подсев трав, рапса, покровных культур. Восстановление прогалин без перепашки." },
  ];

  return (
    <section id="capabilities" className="py-24 bg-agro-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-green" />
            <span className="text-neon-green font-golos text-sm tracking-[0.2em] uppercase">Возможности</span>
          </div>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none">
            Что умеют <span className="text-neon-green">наши дроны</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caps.map((c, i) => (
            <div
              key={c.title}
              className="section-reveal flex gap-4 p-5 rounded-2xl border border-agro-border bg-agro-card hover:border-neon-green/30 glow-box-hover transition-all duration-300"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 bg-neon-green/10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                <Icon name={c.icon} size={20} className="text-neon-green" />
              </div>
              <div>
                <h3 className="font-golos font-bold text-white mb-1">{c.title}</h3>
                <p className="font-golos text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WorksSection = () => {
  const works = [
    { type: "Опрыскивание", crop: "Пшеница", area: "1 240 га", region: "Краснодарский край", result: "Снижение потерь урожая на 18%" },
    { type: "Мониторинг NDVI", crop: "Кукуруза", area: "850 га", region: "Ростовская область", result: "Выявлены 3 очага болезни на ранней стадии" },
    { type: "Внесение удобрений", crop: "Подсолнечник", area: "2 100 га", region: "Ставропольский край", result: "+12% к урожайности vs план" },
    { type: "Высев трав", crop: "Многолетние травы", area: "340 га", region: "Воронежская область", result: "Восстановление после засухи за 1 сезон" },
    { type: "Биозащита", crop: "Свёкла", area: "600 га", region: "Тамбовская область", result: "Полный отказ от химии, сертификат Organic" },
    { type: "Опрыскивание ночью", crop: "Соя", area: "1 780 га", region: "Самарская область", result: "Эффективность +25% vs дневная обработка" },
  ];

  return (
    <section id="works" className="py-24 bg-agro-darker">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-green" />
            <span className="text-neon-green font-golos text-sm tracking-[0.2em] uppercase">Кейсы</span>
          </div>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none">
            Примеры <span className="text-neon-green">выполненных работ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {works.map((w, i) => (
            <div
              key={i}
              className="section-reveal border border-agro-border bg-agro-card rounded-2xl p-5 glow-box-hover hover:border-neon-green/30 transition-all duration-300 group"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-golos text-neon-green border border-neon-green/30 rounded-full px-3 py-1 bg-neon-green/5">
                  {w.type}
                </span>
                <Icon name="MapPin" size={14} className="text-gray-500" />
              </div>
              <div className="font-golos font-bold text-white text-lg mb-1">{w.crop}</div>
              <div className="font-golos text-gray-400 text-sm mb-3">{w.region}</div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <Icon name="Layers" size={14} className="text-neon-green" />
                <span className="font-golos">{w.area}</span>
              </div>
              <div className="pt-3 border-t border-agro-border flex items-start gap-2">
                <Icon name="TrendingUp" size={14} className="text-neon-green mt-0.5 shrink-0" />
                <span className="font-golos text-sm text-gray-300">{w.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { num: "01", title: "Заявка и расчёт", desc: "Оставляете заявку с параметрами поля. Рассчитываем стоимость и подбираем технику за 2 часа." },
    { num: "02", title: "Выезд и подготовка", desc: "Агроном выезжает на поле, оценивает условия, составляет карту полёта и план обработки." },
    { num: "03", title: "Обработка", desc: "Бригада операторов дронов выполняет обработку в согласованные сроки. Контроль в реальном времени." },
    { num: "04", title: "Отчёт", desc: "Получаете детальный отчёт с треком, расходом препарата, картой покрытия и фотоотчётом." },
  ];

  return (
    <section className="py-24 bg-agro-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-reveal mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-green" />
            <span className="text-neon-green font-golos text-sm tracking-[0.2em] uppercase">Процесс</span>
          </div>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none">
            Как мы <span className="text-neon-green">работаем</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="section-reveal relative"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="relative z-10">
                <div className="font-bebas text-6xl text-neon-green/20 mb-2">{s.num}</div>
                <div className="w-10 h-10 border-2 border-neon-green rounded-full flex items-center justify-center mb-4 bg-agro-dark">
                  <div className="w-3 h-3 rounded-full bg-neon-green" />
                </div>
                <h3 className="font-golos font-bold text-white text-lg mb-2">{s.title}</h3>
                <p className="font-golos text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="py-24 bg-agro-darker grid-bg">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="section-reveal">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-neon-green" />
            <span className="text-neon-green font-golos text-sm tracking-[0.2em] uppercase">О нас</span>
          </div>
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none mb-6">
            Профессионалы <span className="text-neon-green">точного земледелия</span>
          </h2>
          <p className="font-golos text-gray-300 text-base leading-relaxed mb-5">
            Мы — команда агрономов и инженеров-дронщиков с опытом работы более 5 лет. Специализируемся на точечных аэрообработках для хозяйств любого масштаба — от семейной фермы до агрохолдинга.
          </p>
          <p className="font-golos text-gray-400 text-sm leading-relaxed mb-8">
            Всё оборудование сертифицировано. Операторы имеют допуск ФАВТ. Работаем по всему Югу и Центру России. Готовы выехать в любой регион при объёме от 500 га.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "Award", text: "Лицензия ФАВТ" },
              { icon: "Users", text: "Команда 20+ человек" },
              { icon: "Globe", text: "10 регионов России" },
              { icon: "Star", text: "5 лет на рынке" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <Icon name={f.icon} size={18} className="text-neon-green shrink-0" />
                <span className="font-golos text-sm text-gray-300">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section-reveal grid grid-cols-2 gap-4">
          {[
            { val: "5+", label: "лет опыта" },
            { val: "280+", label: "завершённых проектов" },
            { val: "15 000+", label: "га обработано" },
            { val: "97%", label: "клиентов возвращаются" },
          ].map((s) => (
            <div key={s.label} className="bg-agro-card border border-agro-border rounded-2xl p-6 glow-box text-center">
              <div className="font-bebas text-4xl text-neon-green mb-2">{s.val}</div>
              <div className="font-golos text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const OrderSection = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    area: "",
    workType: "",
    deadline: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const workTypes = [
    "Опрыскивание СЗР",
    "Внесение удобрений",
    "Мониторинг NDVI",
    "Высев семян",
    "Биозащита",
    "Картографирование",
    "Другое",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="order" className="py-24 bg-agro-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="section-reveal">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-neon-green" />
              <span className="text-neon-green font-golos text-sm tracking-[0.2em] uppercase">Заявка</span>
            </div>
            <h2 className="font-bebas text-[clamp(2.5rem,6vw,5rem)] text-white leading-none mb-6">
              Рассчитать <span className="text-neon-green">стоимость</span>
            </h2>
            <p className="font-golos text-gray-400 text-base leading-relaxed mb-8">
              Заполните форму — наш агроном свяжется с вами в течение 2 часов и предложит оптимальное решение для вашего поля.
            </p>
            <div className="space-y-4">
              {[
                { icon: "Phone", text: "+7 (800) 555-00-00" },
                { icon: "Mail", text: "zakaz@agrondron.ru" },
                { icon: "Clock", text: "Ответ за 2 часа в рабочее время" },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neon-green/10 rounded-lg flex items-center justify-center">
                    <Icon name={c.icon} size={18} className="text-neon-green" />
                  </div>
                  <span className="font-golos text-gray-300">{c.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-reveal">
            {submitted ? (
              <div className="bg-agro-card border border-neon-green/30 rounded-2xl p-10 text-center glow-box">
                <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-neon-green" />
                </div>
                <h3 className="font-bebas text-3xl text-white mb-2">Заявка принята!</h3>
                <p className="font-golos text-gray-400">Наш агроном свяжется с вами в течение 2 часов.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-agro-card border border-agro-border rounded-2xl p-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-golos text-xs text-gray-400 mb-1.5 block">Ваше имя *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Петров"
                      className="w-full bg-agro-darker border border-agro-border rounded-xl px-4 py-3 font-golos text-white text-sm placeholder-gray-600 focus:outline-none focus:border-neon-green/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-golos text-xs text-gray-400 mb-1.5 block">Телефон *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-agro-darker border border-agro-border rounded-xl px-4 py-3 font-golos text-white text-sm placeholder-gray-600 focus:outline-none focus:border-neon-green/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-golos text-xs text-gray-400 mb-1.5 block">Тип работ *</label>
                  <select
                    required
                    value={form.workType}
                    onChange={(e) => setForm({ ...form, workType: e.target.value })}
                    className="w-full bg-agro-darker border border-agro-border rounded-xl px-4 py-3 font-golos text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-600">Выберите тип работ</option>
                    {workTypes.map((t) => (
                      <option key={t} value={t} className="bg-agro-darker">{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-golos text-xs text-gray-400 mb-1.5 block">Адрес / местоположение поля *</label>
                  <input
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Краснодарский край, Тимашевский район"
                    className="w-full bg-agro-darker border border-agro-border rounded-xl px-4 py-3 font-golos text-white text-sm placeholder-gray-600 focus:outline-none focus:border-neon-green/50 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-golos text-xs text-gray-400 mb-1.5 block">Примерная площадь, га *</label>
                    <input
                      required
                      type="number"
                      value={form.area}
                      onChange={(e) => setForm({ ...form, area: e.target.value })}
                      placeholder="500"
                      min="1"
                      className="w-full bg-agro-darker border border-agro-border rounded-xl px-4 py-3 font-golos text-white text-sm placeholder-gray-600 focus:outline-none focus:border-neon-green/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-golos text-xs text-gray-400 mb-1.5 block">Желаемые сроки</label>
                    <input
                      type="date"
                      value={form.deadline}
                      onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                      className="w-full bg-agro-darker border border-agro-border rounded-xl px-4 py-3 font-golos text-white text-sm focus:outline-none focus:border-neon-green/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-golos text-xs text-gray-400 mb-1.5 block">Комментарий</label>
                  <textarea
                    value={form.comment}
                    onChange={(e) => setForm({ ...form, comment: e.target.value })}
                    placeholder="Культура, фаза развития, препарат (если есть)..."
                    rows={3}
                    className="w-full bg-agro-darker border border-agro-border rounded-xl px-4 py-3 font-golos text-white text-sm placeholder-gray-600 focus:outline-none focus:border-neon-green/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-neon-green text-agro-dark font-golos font-bold text-base py-4 rounded-xl hover:bg-neon-lime transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(74,255,107,0.4)] flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={18} />
                  Получить расчёт стоимости
                </button>
                <p className="text-center font-golos text-xs text-gray-500">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-agro-darker border-t border-agro-border py-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-neon-green rounded-sm flex items-center justify-center">
            <Icon name="Plane" size={16} className="text-agro-dark rotate-45" />
          </div>
          <span className="font-bebas text-2xl text-white tracking-widest">АгроДрон</span>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {[
            { href: "#advantages", label: "Преимущества" },
            { href: "#drones", label: "Дроны" },
            { href: "#capabilities", label: "Возможности" },
            { href: "#works", label: "Работы" },
            { href: "#about", label: "О компании" },
            { href: "#order", label: "Заявка" },
          ].map((l) => (
            <a key={l.href} href={l.href} className="font-golos text-sm text-gray-500 hover:text-neon-green transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <div className="font-golos text-xs text-gray-600 text-center">
          © 2024 АгроДрон. Все права защищены.
        </div>
      </div>
    </div>
  </footer>
);

export default function Index() {
  useReveal();

  return (
    <div className="bg-agro-dark min-h-screen">
      <NavBar />
      <HeroSection />
      <StatsSection />
      <AdvantagesSection />
      <DronesSection />
      <CapabilitiesSection />
      <ProcessSection />
      <WorksSection />
      <AboutSection />
      <OrderSection />
      <Footer />
    </div>
  );
}