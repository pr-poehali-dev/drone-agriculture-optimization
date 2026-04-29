import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO    = "https://cdn.poehali.dev/projects/224cca5f-68dc-41aa-8e6c-2eb58749f3cd/files/3e7b789f-53c6-40fd-83d7-19a7f0800735.jpg";
const IMG_DRONE   = "https://cdn.poehali.dev/projects/224cca5f-68dc-41aa-8e6c-2eb58749f3cd/files/4e6d267c-acb9-4664-8d44-182be1acec50.jpg";
const IMG_FIELD   = "https://cdn.poehali.dev/projects/224cca5f-68dc-41aa-8e6c-2eb58749f3cd/files/02b6b970-8973-4dbb-888d-0ae9a9ae92aa.jpg";
const IMG_FARMER  = "https://cdn.poehali.dev/projects/224cca5f-68dc-41aa-8e6c-2eb58749f3cd/files/ca887af8-3602-422f-a408-836bead58df9.jpg";

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".section-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ───── NAV ───── */
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    ["#advantages","Преимущества"],
    ["#drones","Техника"],
    ["#capabilities","Возможности"],
    ["#works","Примеры работ"],
    ["#crops","Культуры"],
    ["#about","О компании"],
    ["#order","Заявка"],
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/95"}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 bg-green-500 rounded flex items-center justify-center">
            <Icon name="Plane" size={14} className="text-white rotate-45" />
          </div>
          <span className="font-golos font-bold text-green-700 text-lg leading-none">АгроДрон</span>
        </a>

        {/* Contacts */}
        <div className="hidden lg:flex items-center gap-5 text-sm text-gray-600">
          <span className="flex items-center gap-1"><Icon name="Phone" size={13} className="text-green-500" />+7 (800) 555-00-00</span>
          <span className="flex items-center gap-1"><Icon name="Mail" size={13} className="text-green-500" />zakaz@agrodron.ru</span>
        </div>

        {/* Nav links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm">
          {links.slice(0,5).map(([h,l]) => (
            <a key={h} href={h} className="text-gray-700 hover:text-green-600 transition-colors font-golos">{l}</a>
          ))}
        </nav>

        {/* CTA */}
        <a href="#order" className="hidden lg:inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold font-golos px-4 py-2 rounded-md transition-colors shrink-0">
          <Icon name="Calculator" size={14} />Рассчитать стоимость
        </a>

        <button className="lg:hidden text-gray-700" onClick={() => setOpen(!open)}>
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t px-4 py-3 flex flex-col gap-3">
          {links.map(([h,l]) => (
            <a key={h} href={h} className="text-gray-700 text-sm font-golos hover:text-green-600" onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href="#order" className="bg-green-500 text-white text-sm font-semibold font-golos px-4 py-2 rounded-md text-center" onClick={() => setOpen(false)}>Рассчитать стоимость</a>
        </div>
      )}
    </header>
  );
};

/* ───── HERO ───── */
const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden pt-16">
    <div className="absolute inset-0">
      <img src={IMG_HERO} alt="Поле" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-white/80" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 lg:py-24 w-full">
      <div className="max-w-3xl">
        <h1 className="font-golos font-bold text-[clamp(1.8rem,4.5vw,3.2rem)] text-gray-900 leading-tight mb-5 animate-fade-up">
          Увеличивайте эффективность<br />
          сельскохозяйственных работ и снижайте стоимость<br />
          обработки полей с помощью&nbsp;
          <span className="text-green-600">беспилотных дронов!</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 animate-fade-up" style={{animationDelay:"0.15s"}}>
          {[
            {icon:"Zap", title:"Снижение затрат", desc:"Экономия до 40% по сравнению с наземной техникой"},
            {icon:"Target", title:"Точная обработка", desc:"Равномерное покрытие 98%, нет пропусков и перерасхода"},
            {icon:"Clock", title:"В 3–5 раз быстрее", desc:"До 500 га в сутки — быстрее любой наземной техники"},
          ].map((f) => (
            <div key={f.title} className="flex gap-3 bg-white/70 backdrop-blur-sm rounded-lg p-3 border border-gray-200 shadow-sm">
              <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                <Icon name={f.icon} size={18} className="text-green-600" />
              </div>
              <div>
                <div className="font-golos font-semibold text-gray-900 text-sm">{f.title}</div>
                <div className="font-golos text-gray-500 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 animate-fade-up" style={{animationDelay:"0.3s"}}>
          <a href="#order" className="bg-green-500 hover:bg-green-600 text-white font-golos font-semibold px-6 py-3 rounded-md text-sm transition-colors flex items-center gap-2">
            <Icon name="Send" size={15} />Оставить заявку
          </a>
          <a href="#capabilities" className="border border-green-500 text-green-600 hover:bg-green-50 font-golos font-semibold px-6 py-3 rounded-md text-sm transition-colors flex items-center gap-2">
            <Icon name="ChevronDown" size={15} />Узнать больше
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ───── ADVANTAGES ───── */
const AdvantagesSection = () => {
  const top = [
    {icon:"Leaf",     title:"Экологичность", desc:"Снижение нагрузки на окружающую среду за счёт точного дозирования препаратов"},
    {icon:"Droplets", title:"Экономия воды",  desc:"Расход воды в 8–10 раз меньше, чем у наземных опрыскивателей"},
    {icon:"MapPin",   title:"Картографирование", desc:"Ортофотопланы и NDVI-карты для точного земледелия"},
  ];
  const bottom = [
    {icon:"ShieldCheck",  title:"Безопасность",   desc:"Нет уплотнения почвы, нет повреждения всходов. Работает на переувлажнённых полях, куда трактор не пройдёт. Операторы аттестованы ФАВТ."},
    {icon:"TrendingUp",   title:"Экономия до 30%", desc:"Снижение расхода препаратов на 30–40% по сравнению с наземными методами благодаря мелкодисперсному распылению и точному трекингу."},
    {icon:"BarChart2",    title:"Аналитика и отчёты", desc:"Детальный отчёт после каждой обработки: трек полёта, расход, карта покрытия. Полная прозрачность перед заказчиком."},
  ];

  return (
    <section id="advantages" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-reveal mb-10">
          <h2 className="font-golos font-bold text-2xl md:text-3xl text-gray-900">
            Преимущества использования<br />наших дронов на<br />
            <span className="text-green-600">Вашем хозяйстве</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {top.map((f,i) => (
            <div key={f.title} className="section-reveal bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow" style={{transitionDelay:`${i*0.1}s`}}>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Icon name={f.icon} size={20} className="text-green-600" />
              </div>
              <h3 className="font-golos font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="font-golos text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottom.map((f,i) => (
            <div key={f.title} className="section-reveal bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow" style={{transitionDelay:`${(i+3)*0.1}s`}}>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Icon name={f.icon} size={20} className="text-green-600" />
              </div>
              <h3 className="font-golos font-semibold text-gray-900 mb-1">{f.title}</h3>
              <p className="font-golos text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───── DRONES ───── */
const DronesSection = () => {
  const drones = [
    {
      name:"Дрон X40",
      type:"Профессиональный опрыскиватель",
      payload:"40 л",
      area:"до 120 га/ч",
      speed:"8 м/с",
      features:["GPS RTK-навигация","Радар уклонений от препятствий","Система автоматического регулирования","Ночной режим работы","Защита от влаги IP67"],
      img: IMG_DRONE,
    },
    {
      name:"Scout Vision",
      type:"Мониторинг и картографирование",
      payload:"RGB+NIR",
      area:"до 200 га/ч",
      speed:"12 м/с",
      features:["Мультиспектральные камеры","Построение NDVI-карт","3D-модели рельефа","Ортофотопланы","Интеграция с ГИС"],
      img: IMG_FIELD,
    },
  ];

  return (
    <section id="drones" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-reveal mb-8">
          <h2 className="font-golos font-bold text-2xl md:text-3xl text-gray-900">
            Работаем на новейшей<br />
            <span className="text-green-600">высокотехнологичной технике</span>
          </h2>
        </div>

        <div className="space-y-6">
          {drones.map((d, i) => (
            <div key={d.name} className={`section-reveal grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-gray-200 shadow-sm`} style={{transitionDelay:`${i*0.1}s`}}>
              <div className="relative h-60 lg:h-auto">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 bg-green-600 text-white font-golos font-bold text-sm px-3 py-1 rounded">
                  {d.name}
                </div>
              </div>
              <div className="bg-gray-50 p-6">
                <div className="inline-block bg-green-100 text-green-700 text-xs font-golos font-semibold px-3 py-1 rounded-full mb-3">
                  {d.type}
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    {l:"Загрузка", v:d.payload},
                    {l:"Площадь/ч", v:d.area},
                    {l:"Скорость", v:d.speed},
                  ].map(s => (
                    <div key={s.l} className="bg-white rounded-lg p-2 border border-gray-200 text-center">
                      <div className="font-golos font-bold text-green-600 text-sm">{s.v}</div>
                      <div className="font-golos text-gray-400 text-xs mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
                <ul className="space-y-1.5">
                  {d.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm font-golos text-gray-700">
                      <Icon name="Check" size={14} className="text-green-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───── CAPABILITIES ───── */
const CapabilitiesSection = () => {
  const caps = [
    {icon:"Droplets",  title:"Обработка полей от вредителей",     desc:"Подробнее", img:IMG_HERO},
    {icon:"Sprout",    title:"Внесение средств защиты растений",   desc:"Подробнее", img:IMG_FIELD},
    {icon:"Bug",       title:"Агрохимическая борьба с сорняками",  desc:"Подробнее", img:IMG_DRONE},
    {icon:"ScanLine",  title:"Построение NDVI карт культур",       desc:"Подробнее", img:IMG_HERO},
    {icon:"Leaf",      title:"Высев покровных трав",               desc:"Подробнее", img:IMG_FIELD},
    {icon:"Map",       title:"Мы обработаем поля дронами",         desc:"Подробнее", img:IMG_DRONE},
  ];

  return (
    <section id="capabilities" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-reveal mb-8">
          <h2 className="font-golos font-bold text-2xl md:text-3xl text-gray-900">
            Что могут наши дроны:
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {caps.map((c, i) => (
            <div key={c.title} className="section-reveal rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow group" style={{transitionDelay:`${i*0.08}s`}}>
              <div className="relative h-40 overflow-hidden">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="bg-white p-4">
                <h3 className="font-golos font-semibold text-gray-900 text-sm mb-2">{c.title}</h3>
                <a href="#order" className="font-golos text-green-600 text-xs font-semibold hover:text-green-700 flex items-center gap-1">
                  {c.desc}<Icon name="ChevronRight" size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───── ORDER BANNER ───── */
const OrderBanner = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={IMG_FIELD} alt="Поле" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-dark/75" />
    </div>
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
      <div className="max-w-2xl">
        <h2 className="font-golos font-bold text-2xl md:text-3xl text-white mb-2">
          Оставьте заявку на
        </h2>
        <h2 className="font-golos font-bold text-2xl md:text-3xl text-white mb-4">
          индивидуальный расчёт стоимости<br />
          работы на вашем участке
        </h2>
        <a href="#order" className="bg-green-500 hover:bg-green-600 text-white font-golos font-semibold px-6 py-3 rounded-md text-sm transition-colors inline-flex items-center gap-2">
          <Icon name="Calculator" size={15} />Рассчитать стоимость
        </a>
      </div>
    </div>
  </section>
);

/* ───── ABOUT ───── */
const AboutSection = () => (
  <section id="about" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="section-reveal mb-8">
        <h2 className="font-golos font-bold text-2xl md:text-3xl text-gray-900">О компании</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="section-reveal">
          <div className="relative rounded-xl overflow-hidden h-72 mb-4">
            <img src={IMG_FARMER} alt="Агроном" className="w-full h-full object-cover" />
            <div className="absolute bottom-3 left-3 bg-green-600 text-white text-xs font-golos font-semibold px-3 py-1.5 rounded">
              15 000+ га обработано
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              {v:"5+",    l:"лет на рынке"},
              {v:"280+",  l:"проектов"},
              {v:"97%",   l:"клиентов возвращаются"},
              {v:"10",    l:"регионов России"},
            ].map(s => (
              <div key={s.l} className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
                <div className="font-golos font-bold text-green-600 text-xl">{s.v}</div>
                <div className="font-golos text-gray-500 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="section-reveal">
          <h3 className="font-golos font-semibold text-gray-800 mb-3">Компания работает по многим регионам России:</h3>
          {/* Stylised map placeholder */}
          <div className="bg-green-50 border border-green-200 rounded-xl h-56 flex items-center justify-center mb-4 relative overflow-hidden">
            <img src={IMG_HERO} alt="Карта" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <Icon name="Map" size={40} className="text-green-500 opacity-60" />
              <span className="font-golos text-green-700 text-sm font-semibold">10 регионов России</span>
            </div>
            {/* Region markers */}
            {[
              {t:"Краснодарский край", x:"25%", y:"70%"},
              {t:"Ставропольский край", x:"35%", y:"60%"},
              {t:"Ростовская обл.", x:"28%", y:"50%"},
              {t:"Воронежская обл.", x:"38%", y:"35%"},
              {t:"Самарская обл.", x:"55%", y:"30%"},
            ].map(m => (
              <div key={m.t} className="absolute flex items-center gap-1" style={{left:m.x,top:m.y}}>
                <div className="w-2.5 h-2.5 bg-green-600 rounded-full border-2 border-white shadow" />
                <span className="font-golos text-[10px] text-green-900 bg-white/80 px-1 rounded hidden md:block">{m.t}</span>
              </div>
            ))}
          </div>
          <p className="font-golos text-gray-600 text-sm leading-relaxed">
            Профессиональная команда агрономов и операторов дронов с опытом более 5 лет. Обслуживаем хозяйства от 50 га до крупных агрохолдингов. Лицензия ФАВТ, сертифицированное оборудование.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Лицензия ФАВТ","Сертифицированное оборудование","Страхование ответственности","Гарантия результата"].map(t => (
              <span key={t} className="text-xs font-golos text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───── CROPS ───── */
const CropsSection = () => {
  const crops = [
    {icon:"Wheat",     title:"Зерновые культуры",  items:["Пшеница","Ячмень","Рожь","Тритикале"]},
    {icon:"Leaf",      title:"Рапсовые поля",       items:["Озимый рапс","Яровой рапс","Горчица"]},
    {icon:"Sprout",    title:"Подсолнечник и кукуруза", items:["Подсолнечник","Кукуруза на зерно","Кукуруза на силос"]},
    {icon:"Apple",     title:"Ягодные плантации",   items:["Клубника","Малина","Смородина"]},
    {icon:"TreePine",  title:"Сады",                items:["Яблоня","Груша","Косточковые"]},
    {icon:"Flower2",   title:"Виноградники",        items:["Технические сорта","Столовые сорта"]},
  ];

  return (
    <section id="crops" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-reveal mb-8">
          <h2 className="font-golos font-bold text-2xl md:text-3xl text-gray-900">
            Проводим обработку всех видов культур:
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {crops.map((c,i) => (
            <div key={c.title} className="section-reveal bg-white rounded-xl p-4 border border-gray-200 shadow-sm" style={{transitionDelay:`${i*0.08}s`}}>
              <div className="flex items-center gap-2 mb-2">
                <Icon name={c.icon} size={18} className="text-green-600" />
                <h3 className="font-golos font-semibold text-gray-900 text-sm">{c.title}</h3>
              </div>
              <ul className="space-y-1">
                {c.items.map(item => (
                  <li key={item} className="font-golos text-gray-500 text-xs flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-green-400 rounded-full shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───── WORKS / ПРИМЕРЫ ───── */
const WorksSection = () => {
  const examples = [
    {
      title:"Дезинсекция подсолнечника",
      before:IMG_FIELD,
      after:IMG_HERO,
      label:"Выполнено",
      details:"Краснодарский кр. · 1 240 га · Снижение поражённости на 87%",
    },
    {
      title:"Химическое уничтожение сорняков",
      before:IMG_HERO,
      after:IMG_FIELD,
      label:"Выполнено",
      details:"Ростовская обл. · 850 га · Всходы сорняков снижены до 2%",
    },
  ];

  return (
    <section id="works" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="section-reveal mb-8">
          <h2 className="font-golos font-bold text-2xl md:text-3xl text-gray-900">Пример обработки полей</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {examples.map((ex,i) => (
            <div key={ex.title} className="section-reveal rounded-xl overflow-hidden border border-gray-200 shadow-sm" style={{transitionDelay:`${i*0.1}s`}}>
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src={ex.before} alt="До" className="w-full h-44 object-cover" />
                  <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-golos font-bold px-2 py-0.5 rounded">ДО</div>
                </div>
                <div className="relative">
                  <img src={ex.after} alt="После" className="w-full h-44 object-cover" />
                  <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-golos font-bold px-2 py-0.5 rounded">ПОСЛЕ</div>
                </div>
              </div>
              <div className="bg-white p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-green-100 text-green-700 text-xs font-golos font-semibold px-2 py-0.5 rounded">{ex.label}</span>
                  <h3 className="font-golos font-semibold text-gray-900 text-sm">{ex.title}</h3>
                </div>
                <p className="font-golos text-gray-500 text-xs">{ex.details}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner with drone image */}
        <div className="section-reveal relative rounded-2xl overflow-hidden">
          <img src={IMG_DRONE} alt="Дрон" className="absolute right-0 bottom-0 h-full object-cover w-1/2 object-center opacity-30 lg:opacity-70" />
          <div className="relative z-10 bg-gradient-to-r from-dark to-dark/60 lg:from-dark lg:via-dark/80 lg:to-transparent p-8 md:p-12">
            <p className="font-golos text-green-400 text-sm font-semibold mb-2 uppercase tracking-wider">Уважаемый аграрий,</p>
            <h3 className="font-golos font-bold text-white text-xl md:text-2xl mb-4 max-w-lg">
              давайте начнём знакомство с расчёта стоимости обработки Вашего поля с помощью наших дронов
            </h3>
            <a href="#order" className="bg-green-500 hover:bg-green-600 text-white font-golos font-semibold px-6 py-3 rounded-md text-sm transition-colors inline-flex items-center gap-2">
              <Icon name="Calculator" size={15} />Рассчитать стоимость
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───── ORDER FORM ───── */
const OrderSection = () => {
  const [form, setForm] = useState({name:"",phone:"",address:"",area:"",workType:"",deadline:"",comment:""});
  const [submitted, setSubmitted] = useState(false);

  const workTypes = ["Опрыскивание СЗР","Внесение удобрений","Мониторинг NDVI","Высев семян","Биозащита","Картографирование","Другое"];

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="order" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="section-reveal">
            <h2 className="font-golos font-bold text-2xl md:text-3xl text-gray-900 mb-3">
              Оставьте заявку на<br />
              <span className="text-green-600">расчёт стоимости</span>
            </h2>
            <p className="font-golos text-gray-500 text-sm mb-6">Наш агроном свяжется с вами в течение 2 часов в рабочее время и предложит оптимальное решение.</p>
            <div className="space-y-3">
              {[
                {icon:"Phone", t:"+7 (800) 555-00-00"},
                {icon:"Mail",  t:"zakaz@agrodron.ru"},
                {icon:"Clock", t:"Пн–Пт: 8:00–20:00, Сб–Вс: 9:00–18:00"},
              ].map(c => (
                <div key={c.t} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={16} className="text-green-600" />
                  </div>
                  <span className="font-golos text-gray-700 text-sm">{c.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section-reveal">
            {submitted ? (
              <div className="bg-white border border-green-200 rounded-xl p-10 text-center shadow-sm">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={28} className="text-green-600" />
                </div>
                <h3 className="font-golos font-bold text-xl text-gray-900 mb-1">Заявка принята!</h3>
                <p className="font-golos text-gray-500 text-sm">Свяжемся с вами в течение 2 часов.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-golos text-xs text-gray-500 mb-1 block">Ваше имя *</label>
                    <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Иван Петров"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 font-golos text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors" />
                  </div>
                  <div>
                    <label className="font-golos text-xs text-gray-500 mb-1 block">Телефон *</label>
                    <input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+7 (999) 000-00-00"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 font-golos text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="font-golos text-xs text-gray-500 mb-1 block">Тип работ *</label>
                  <select required value={form.workType} onChange={e=>setForm({...form,workType:e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 font-golos text-sm text-gray-900 focus:outline-none focus:border-green-400 transition-colors appearance-none bg-white">
                    <option value="" disabled>Выберите тип работ</option>
                    {workTypes.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-golos text-xs text-gray-500 mb-1 block">Адрес / местоположение поля *</label>
                  <input required value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Краснодарский край, Тимашевский район"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 font-golos text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-golos text-xs text-gray-500 mb-1 block">Площадь, га *</label>
                    <input required type="number" min="1" value={form.area} onChange={e=>setForm({...form,area:e.target.value})} placeholder="500"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 font-golos text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors" />
                  </div>
                  <div>
                    <label className="font-golos text-xs text-gray-500 mb-1 block">Желаемые сроки</label>
                    <input type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 font-golos text-sm text-gray-900 focus:outline-none focus:border-green-400 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="font-golos text-xs text-gray-500 mb-1 block">Комментарий</label>
                  <textarea rows={3} value={form.comment} onChange={e=>setForm({...form,comment:e.target.value})} placeholder="Культура, фаза развития, препарат..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 font-golos text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-400 transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-golos font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-100">
                  <Icon name="Send" size={15} />Отправить заявку
                </button>
                <p className="text-center font-golos text-xs text-gray-400">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───── FOOTER ───── */
const Footer = () => (
  <footer className="bg-dark text-gray-300 py-10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-green-500 rounded flex items-center justify-center">
              <Icon name="Plane" size={14} className="text-white rotate-45" />
            </div>
            <span className="font-golos font-bold text-white text-lg">АгроДрон</span>
          </div>
          <p className="font-golos text-gray-400 text-xs leading-relaxed">Профессиональная обработка полей дронами по всей России</p>
        </div>
        <div>
          <h4 className="font-golos font-semibold text-white text-sm mb-3">Услуги</h4>
          <ul className="space-y-1.5">
            {["Опрыскивание СЗР","Внесение удобрений","Мониторинг NDVI","Высев семян"].map(t=>(
              <li key={t}><a href="#capabilities" className="font-golos text-gray-400 text-xs hover:text-green-400 transition-colors">{t}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-golos font-semibold text-white text-sm mb-3">Компания</h4>
          <ul className="space-y-1.5">
            {[["#about","О компании"],["#works","Примеры работ"],["#drones","Техника"],["#order","Контакты"]].map(([h,l])=>(
              <li key={h}><a href={h} className="font-golos text-gray-400 text-xs hover:text-green-400 transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-golos font-semibold text-white text-sm mb-3">Контакты</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2"><Icon name="Phone" size={13} className="text-green-500" /><span className="font-golos text-gray-400 text-xs">+7 (800) 555-00-00</span></div>
            <div className="flex items-center gap-2"><Icon name="Mail" size={13} className="text-green-500" /><span className="font-golos text-gray-400 text-xs">zakaz@agrodron.ru</span></div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 pt-5 text-center">
        <p className="font-golos text-gray-500 text-xs">© 2024 АгроДрон. Все права защищены.</p>
      </div>
    </div>
  </footer>
);

/* ───── PAGE ───── */
export default function Index() {
  useReveal();
  return (
    <div className="bg-white min-h-screen font-golos">
      <NavBar />
      <HeroSection />
      <AdvantagesSection />
      <DronesSection />
      <CapabilitiesSection />
      <OrderBanner />
      <AboutSection />
      <CropsSection />
      <WorksSection />
      <OrderSection />
      <Footer />
    </div>
  );
}
