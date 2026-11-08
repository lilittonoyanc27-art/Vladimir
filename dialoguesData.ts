/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DialogueItem } from './types';

export const dialoguesData: DialogueItem[] = [
  // ========================================================
  // 1. ЗВОНОК ПО ОБЪЯВЛЕНИЮ О ВАКАНСИИ СВАРЩИКА
  // ========================================================
  {
    id: 'diag-1',
    titleRu: 'Звонок работодателю: вакансия сварщика',
    category: 'welder',
    situation: 'Вы звоните по объявлению на испанском сайте вакансий в компанию по металлоконструкциям.',
    roles: {
      person1: { nameRu: 'Секретарь фирмы', nameEs: 'Recepcionista', roleRu: 'Секретарь' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Кандидат' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Talleres Metálicos García, dígame, ¿en qué puedo ayudarle?',
        textRu: 'Металлообрабатывающие цеха Гарсия, слушаю вас. Чем могу помочь?',
        transcription: 'Тайе́рэс Мэтали́кос Гарси́а, ди́гамэ, ¿эн кэ пуэ́до айюда́рлэ?',
      },
      {
        speakerId: 'person2',
        textEs: 'Hola, buenos días. ¿Puedo hablar con la persona encargada de la selección de personal?',
        textRu: 'Здравствуйте! Можно поговорить с ответственным за подбор персонала?',
        transcription: 'О́ла, буэ́нос ди́ас. ¿Пуэ́до абла́р кон ла пэрсо́на энкарга́да дэ ла сэлэксьо́н дэ пэрсона́ль?',
        trainingOptions: [
          {
            textEs: 'Hola, buenos días. ¿Puedo hablar con la persona encargada de la selección de personal?',
            textRu: 'Здравствуйте! Можно поговорить с ответственным за подбор персонала?',
            isCorrect: true,
          },
          {
            textEs: 'Quiero comer carne con patatas.',
            textRu: 'Я хочу съесть мясо с картошкой.',
            isCorrect: false,
            explanation: 'Это заказ в ресторане, а не деловой звонок.',
          },
          {
            textEs: '¿Dónde está el baño?',
            textRu: 'Где находится туалет?',
            isCorrect: false,
            explanation: 'Это вопрос о местонахождении туалета.',
          },
        ],
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, un momento por favor. ¿De parte de quién y por qué asunto?',
        textRu: 'Да, минуту пожалуйста. Кто звонит и по какому вопросу?',
        transcription: 'Си, ун момэ́нто пор фаво́р. ¿Дэ па́ртэ дэ кье́н и пор кэ асу́нто?',
      },
      {
        speakerId: 'person2',
        textEs: 'Me llamo Vladimir. Llamo por la oferta de trabajo de soldador que han publicado.',
        textRu: 'Меня зовут Владимир. Я звоню по поводу вакансии сварщика, которую вы опубликовали.',
        transcription: 'Мэ йя́мо Алэксэ́й. Йя́мо пор ла офэ́рта дэ траба́хо дэ сольдадо́р кэ ан публика́до.',
        trainingOptions: [
          {
            textEs: 'Me llamo Vladimir. Llamo por la oferta de trabajo de soldador que han publicado.',
            textRu: 'Меня зовут Владимир. Я звоню по поводу вакансии сварщика.',
            isCorrect: true,
          },
          {
            textEs: 'No tengo dinero para el autobús.',
            textRu: 'У меня нет денег на автобус.',
            isCorrect: false,
            explanation: 'Не относится к вакансии.',
          },
        ],
      },
      {
        speakerId: 'person1',
        textEs: 'Muy bien, le paso con don Manuel, el jefe de taller. Manténgase a la espera.',
        textRu: 'Отлично, соединяю вас с доном Мануэлем, начальником цеха. Оставайтесь на линии.',
        transcription: 'Муй бьен, лэ па́со кон дон Мануэ́ль, эль хэ́фэ дэ тайе́р. Мантэ́нгасэ а ла эспэ́ра.',
      },
      {
        speakerId: 'person2',
        textEs: 'Muchas gracias por su atención.',
        textRu: 'Большое спасибо за уделённое время.',
        transcription: 'Му́час гра́сьяс пор су атэнсьо́н.',
      },
    ],
  },

  // ========================================================
  // 2. ОБСУЖДЕНИЕ ОПЫТА И МЕТОДОВ СВАРКИ
  // ========================================================
  {
    id: 'diag-2',
    titleRu: 'Собеседование: опыт сварки MIG/MAG и TIG',
    category: 'welder',
    situation: 'Начальник цеха расспрашивает вас о вашем сварочном стаже и аппаратах.',
    roles: {
      person1: { nameRu: 'Мануэль (Начальник цеха)', nameEs: 'Manuel (Jefe de taller)', roleRu: 'Работодатель' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Dígame Vladimir, ¿cuántos años de experiencia tiene y qué métodos domina?',
        textRu: 'Скажите, Владимир, сколько у вас лет опыта и какими методами владеете?',
        transcription: 'Ди́гамэ Алэксэ́й, ¿куа́нтос а́ньос дэ экспэрье́нсья тье́нэ и кэ мэ́тодос доми́на?',
      },
      {
        speakerId: 'person2',
        textEs: 'Tengo cinco años de experiencia. Sueldo con semiautomática MIG/MAG y con TIG.',
        textRu: 'У меня пять лет опыта. Варю полуавтоматом MIG/MAG и аргоном TIG.',
        transcription: 'Тэ́нго си́нко а́ньос дэ экспэрье́нсья. Суэ́льдо кон сэмиаутома́тика Миг/Маг и кон Тиг.',
        trainingOptions: [
          {
            textEs: 'Tengo cinco años de experiencia. Sueldo con semiautomática MIG/MAG y con TIG.',
            textRu: 'У меня 5 лет опыта. Варю полуавтоматом и TIG.',
            isCorrect: true,
          },
          {
            textEs: 'No sé soldar nada.',
            textRu: 'Я ничего не умею варить.',
            isCorrect: false,
            explanation: 'Это означает отсутствие навыков.',
          },
        ],
      },
      {
        speakerId: 'person1',
        textEs: '¿Qué tipo de materiales ha trabajado principalmente?',
        textRu: 'С какими материалами вы в основном работали?',
        transcription: '¿Кэ ти́по дэ матэрья́лэс а трабаха́до принсипальме́нтэ?',
      },
      {
        speakerId: 'person2',
        textEs: 'Principalmente acero al carbono y acero inoxidable para tuberías y estructuras.',
        textRu: 'Главным образом углеродистая и нержавеющая сталь для труб и конструкций.',
        transcription: 'Принсипальме́нтэ асэ́ро аль карбо́но и асэ́ро иноксида́бле па́ра тубэри́ас и эструкту́рас.',
      },
      {
        speakerId: 'person1',
        textEs: '¿Sabe interpretar planos de calderería y estructuras?',
        textRu: 'Умеете читать чертежи котельно-сборочного производства и конструкций?',
        transcription: '¿Са́бэ интэрпрэта́р пла́нос дэ кальдэрэри́а и эструкту́рас?',
      },
      {
        speakerId: 'person2',
        textEs: 'Sí, sé leer planos, medidas y símbolos de cordones de soldadura.',
        textRu: 'Да, я умею читать чертежи, размеры и символы сварочных швов.',
        transcription: 'Си, сэ лээ́р пла́нос, мэди́дас и си́мболос дэ кордо́нэс дэ сольдаду́ра.',
      },
    ],
  },

  // ========================================================
  // 3. ОБСУЖДЕНИЕ ЗАРПЛАТЫ И КОНТРАКТА
  // ========================================================
  {
    id: 'diag-3',
    titleRu: 'Условия работы: зарплата брутто/нетто и контракт',
    category: 'welder',
    situation: 'Обсуждение ставки оплаты труда, графика и официального оформления.',
    roles: {
      person1: { nameRu: 'Специалист по кадрам', nameEs: 'Recursos Humanos', roleRu: 'HR менеджер' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Ofrecemos jornada completa de cuarenta horas semanales de lunes a viernes.',
        textRu: 'Мы предлагаем полную занятость 40 часов в неделю с понедельника по пятницу.',
        transcription: 'Офрэсэ́мос хорна́да компле́та дэ куарэ́нта о́рас сэмана́лэс дэ лу́нэс а вье́рнэс.',
      },
      {
        speakerId: 'person2',
        textEs: '¿Cuál es el horario de trabajo y cuál es el sueldo?',
        textRu: 'Какой график работы и какая зарплата?',
        transcription: '¿Куа́ль эс эль ора́рьо дэ траба́хо и куа́ль эс эль суэ́льдо?',
        trainingOptions: [
          {
            textEs: '¿Cuál es el horario de trabajo y cuál es el sueldo?',
            textRu: 'Какой график работы и какая зарплата?',
            isCorrect: true,
          },
          {
            textEs: 'Quiero dormir todo el día.',
            textRu: 'Я хочу спать весь день.',
            isCorrect: false,
          },
        ],
      },
      {
        speakerId: 'person1',
        textEs: 'El horario es continuo de 7:00 a 15:00. El salario inicial es de 1.700 euros al mes.',
        textRu: 'График непрерывный с 7:00 до 15:00. Начальная зарплата 1700 евро в месяц.',
        transcription: 'Эль ора́рьо эс конти́нуо дэ сье́тэ а ки́нсэ. Эль сала́рьо инисья́ль эс дэ миль сэтэсье́нтос э́урос аль мэ́с.',
      },
      {
        speakerId: 'person2',
        textEs: '¿Ese sueldo es bruto o neto? ¿Y se pagan las horas extra?',
        textRu: 'Это зарплата до или после вычета налогов? И оплачиваются ли сверхурочные?',
        transcription: '¿Э́сэ суэ́льдо эс бру́то о нэ́то? ¿И сэ па́ган лас о́рас э́кстра?',
      },
      {
        speakerId: 'person1',
        textEs: 'Son 1.700 brutos, unos 1.450 netos. Las horas extra se pagan aparte según convenio.',
        textRu: 'Это 1700 брутто, около 1450 на руки. Сверхурочные оплачиваются отдельно по соглашению.',
        transcription: 'Сон миль сэтэсье́нтос бру́тос, у́нос миль куатросье́нтос синкуэ́нта нэ́тос. Лас о́рас э́кстра сэ па́ган апа́ртэ сэгу́н конвэ́ньо.',
      },
      {
        speakerId: 'person2',
        textEs: 'De acuerdo. ¿La empresa se encarga del alta en la Seguridad Social?',
        textRu: 'Понял, хорошо. Предприятие регистрирует в Социальном страховании?',
        transcription: 'Дэ акуэ́рдо. ¿Ла эмпрэ́са сэ энка́рга дэль а́льта эн ла Сэгурида́д Сосья́ль?',
      },
      {
        speakerId: 'person1',
        textEs: 'Por supuesto, desde el primer día con contrato de trabajo oficial.',
        textRu: 'Разумеется, с первого же дня с официальным трудовым договором.',
        transcription: 'Пор супуэ́сто, дэ́сдэ эль примэ́р ди́а кон контра́то дэ траба́хо офисья́ль.',
      },
    ],
  },

  // ========================================================
  // 4. ПЕРВЫЙ ДЕНЬ В ЦЕХЕ: ИНСТРУКТАЖ И РАБОЧЕЕ МЕСТО
  // ========================================================
  {
    id: 'diag-4',
    titleRu: 'Первый рабочий день: цех и инструменты',
    category: 'welder',
    situation: 'Бригадир показывает вам сварочный пост, раздевалку и выдаёт задание.',
    roles: {
      person1: { nameRu: 'Антонио (Бригадир)', nameEs: 'Antonio (Encargado)', roleRu: 'Бригадир' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: '¡Bienvenido Vladimir! Este es tu puesto de trabajo. Aquí tienes la máquina de hilo.',
        textRu: 'Добро пожаловать, Владимир! Это твой сварочный пост. Вот полуавтомат.',
        transcription: '¡Бьенвэни́до Алэксэ́й! Э́стэ эс ту пуэ́сто дэ траба́хо. Аки́ тье́нэс ла ма́кина дэ и́ло.',
      },
      {
        speakerId: 'person2',
        textEs: 'Gracias, Antonio. Todavía no hablo bien español. Muéstreme cómo hay que hacerlo, por favor.',
        textRu: 'Спасибо, Антонио. Я пока плохо говорю по-испански. Покажите, как нужно сделать, пожалуйста.',
        transcription: 'Гра́сьяс, Анто́нио. Тодави́а но а́бло бьен эспаньо́ль. Муэ́стрэмэ ко́мо ай кэ асэ́рло, пор фаво́р.',
        trainingOptions: [
          {
            textEs: 'Todavía no hablo bien español. Muéstreme cómo hay que hacerlo, por favor.',
            textRu: 'Я пока плохо говорю по-испански. Покажите, как нужно сделать.',
            isCorrect: true,
          },
          {
            textEs: 'No quiero trabajar aquí.',
            textRu: 'Я не хочу здесь работать.',
            isCorrect: false,
          },
        ],
      },
      {
        speakerId: 'person1',
        textEs: 'No te preocupes. Hay que soldar estas pletinas en ángulo con cordón de cinco milímetros.',
        textRu: 'Не переживай. Нужно сварить эти пластины в тавр (под углом) с катетом шва 5 мм.',
        transcription: 'Но тэ прэоку́пэс. Ай кэ сольда́р э́стас плэти́нас эн а́нгуло кон кордо́н дэ си́нко милимэ́трос.',
      },
      {
        speakerId: 'person2',
        textEs: 'Entendido. ¿La botella tiene suficiente gas mezcla?',
        textRu: 'Понял. В баллоне достаточно защитного газа?',
        transcription: 'Энтэнди́до. ¿Ла ботэ́йя тье́нэ суфисье́нтэ гас мэ́скла?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, está llena a 200 bares. Si necesitas discos para la radial, pídemelos.',
        textRu: 'Да, он полный на 200 бар. Если понадобятся круги для болгарки — проси у меня.',
        transcription: 'Си, эста́ йе́на а доссье́нтос ба́рэс. Си нэсэси́тас ди́скос па́ра ла радья́ль, пи́дэмэлос.',
      },
      {
        speakerId: 'person2',
        textEs: 'Perfecto. Voy a regular los parámetros y empiezo a soldar.',
        textRu: 'Отлично. Настрою параметры и приступаю к сварке.',
        transcription: 'Пэрфэ́кто. Вой а рэгула́р лос пара́мэтрос и эмпье́со а сольда́р.',
      },
    ],
  },

  // ========================================================
  // 5. ОПАСНАЯ СИТУАЦИЯ И ВЕНТИЛЯЦИЯ В ЦЕХЕ
  // ========================================================
  {
    id: 'diag-5',
    titleRu: 'Безопасность: недостаток вентиляции и дым',
    category: 'welder',
    situation: 'Во время интенсивной сварки вытяжка не справляется, цех затягивает дымом.',
    roles: {
      person1: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
      person2: { nameRu: 'Бригадир', nameEs: 'Encargado', roleRu: 'Бригадир' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Antonio, por favor, venga un momento. Aquí no hay suficiente ventilación.',
        textRu: 'Антонио, пожалуйста, подойдите на секунду. Здесь недостаточно вентиляции.',
        transcription: 'Анто́нио, пор фаво́р, вэ́нга ун момэ́нто. Аки́ но ай суфисье́нтэ вэнтиласьо́н.',
      },
      {
        speakerId: 'person2',
        textEs: '¿Qué ha pasado? ¿Se ha parado el extractor central?',
        textRu: 'Что случилось? Остановилась центральная вытяжка?',
        transcription: '¿Кэ а паса́до? ¿Сэ а пара́до эль экстракто́р сэнтра́ль?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, el tubo de aspiración no absorbe el humo y apenas puedo respirar.',
        textRu: 'Да, всасывающий рукав не тянет дым, тяжело дышать.',
        transcription: 'Си, эль ту́бо дэ аспирасьо́н но абсо́рбэ эль у́мо и апэ́нас пуэ́до рэспира́р.',
      },
      {
        speakerId: 'person2',
        textEs: 'Tienes toda la razón. Para de soldar ahora mismo. Voy a abrir el portón y revisar el motor.',
        textRu: 'Ты совершенно прав. Останови сварку прямо сейчас. Я открою ворота и проверю мотор.',
        transcription: 'Тье́нэс то́да ла расо́н. Па́ра дэ сольда́р ао́ра ми́смо. Вой а абри́р эль порто́н и рэвиса́р эль мото́р.',
      },
      {
        speakerId: 'person1',
        textEs: 'Gracias. También me pondré la mascarilla con filtro de carbono.',
        textRu: 'Спасибо. Я также надену респиратор с угольным фильтром.',
        transcription: 'Гра́сьяс. Тамбье́н мэ пондрэ́ ла маскари́йя кон фи́льтро дэ карбо́но.',
      },
    ],
  },

  // ========================================================
  // 6. СТОЙКА РЕГИСТРАЦИИ В АЭРОПОРТУ
  // ========================================================
  {
    id: 'diag-6',
    titleRu: 'Аэропорт: сдача багажа и регистрация',
    category: 'travel',
    situation: 'Регистрация на рейс в аэропорту и сдача тяжёлого чемодана.',
    roles: {
      person1: { nameRu: 'Сотрудник авиакомпании', nameEs: 'Agente de facturación', roleRu: 'Агент' },
      person2: { nameRu: 'Владимир (Пассажир)', nameEs: 'Vladimir (Pasajero)', roleRu: 'Пассажир' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Buenos días. Su pasaporte y billete, por favor.',
        textRu: 'Доброе утро. Ваш паспорт и билет, пожалуйста.',
        transcription: 'Буэ́нос ди́ас. Су пасапо́ртэ и бийе́тэ, пор фаво́р.',
      },
      {
        speakerId: 'person2',
        textEs: 'Buenos días. Aquí tiene. Quiero facturar esta maleta.',
        textRu: 'Доброе утро. Вот, пожалуйста. Я хочу сдать этот чемодан.',
        transcription: 'Буэ́нос ди́ас. Аки́ тье́нэ. Кье́ро фактура́р э́ста мале́та.',
        trainingOptions: [
          {
            textEs: 'Buenos días. Aquí tiene. Quiero facturar esta maleta.',
            textRu: 'Доброе утро. Вот. Хочу сдать этот чемодан.',
            isCorrect: true,
          },
          {
            textEs: 'No tengo maletas, solo un sándwich.',
            textRu: 'У меня нет чемоданов, только сэндвич.',
            isCorrect: false,
          },
        ],
      },
      {
        speakerId: 'person1',
        textEs: 'Póngala sobre la báscula... Pesa 21 kilos, está dentro del límite.',
        textRu: 'Поставьте чемодан на весы... Весит 21 кг, это в пределах нормы.',
        transcription: 'По́нгала со́брэ ла ба́скула... Пэ́са вэинтиу́н ки́лос, эста́ дэ́нтро дэль ли́митэ.',
      },
      {
        speakerId: 'person2',
        textEs: '¿Dónde está la puerta de embarque?',
        textRu: 'Где находится выход на посадку?',
        transcription: '¿До́ндэ эста́ ла пуэ́рта дэ эмба́ркэ?',
      },
      {
        speakerId: 'person1',
        textEs: 'Puerta K12. El embarque empieza a las 11:15. ¡Buen vuelo!',
        textRu: 'Выход K12. Посадка начинается в 11:15. Счастливого полёта!',
        transcription: 'Пуэ́рта Ка-до́сэ. Эль эмба́ркэ эмпье́са а лас о́нсэ и ки́нсэ. ¡Буэн вуэ́ло!',
      },
      {
        speakerId: 'person2',
        textEs: 'Muchas gracias. Hasta luego.',
        textRu: 'Большое спасибо. До свидания.',
        transcription: 'Му́час гра́сьяс. А́ста луэ́го.',
      },
    ],
  },

  // ========================================================
  // 7. СЛУЖБА РОЗЫСКА БАГАЖА В АЭРОПОРТУ
  // ========================================================
  {
    id: 'diag-7',
    titleRu: 'Аэропорт: чемодан не прибыл на ленту',
    category: 'travel',
    situation: 'Ваш чемодан не появился на выдаче багажа, вы обращаетесь в стойку розыска.',
    roles: {
      person1: { nameRu: 'Сотрудник службы багажа', nameEs: 'Agente de equipajes', roleRu: 'Сотрудник' },
      person2: { nameRu: 'Владимир (Пассажир)', nameEs: 'Vladimir (Pasajero)', roleRu: 'Пассажир' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Hola, disculpe. Mi equipaje no ha llegado en la cinta.',
        textRu: 'Здравствуйте, извините. Мой багаж не прибыл на ленту выдачи.',
        transcription: 'О́ла, диску́льпэ. Ми экипа́хэ но а йега́до эн ла си́нта.',
      },
      {
        speakerId: 'person1',
        textEs: 'Buenas tardes. Deme su tarjeta de embarque y el resguardo de la maleta.',
        textRu: 'Добрый день. Дайте ваш посадочный талон и багажную квитанцию.',
        transcription: 'Буэ́нас та́рдэс. Дэ́мэ су тархэ́та дэ эмба́ркэ и эль рэсгуа́рдо дэ ла мале́та.',
      },
      {
        speakerId: 'person2',
        textEs: 'Aquí tiene. Es una maleta negra rígida con ruedas.',
        textRu: 'Вот, держите. Это чёрный жёсткий чемодан на колёсиках.',
        transcription: 'Аки́ тье́нэ. Эс у́на мале́та нэ́гра ри́хида кон руэ́дас.',
      },
      {
        speakerId: 'person1',
        textEs: 'Veo en el sistema que se quedó en la escala. Llegará en el vuelo de esta noche.',
        textRu: 'Вижу в системе, что он остался в пункте пересадки. Прилетит ночным рейсом.',
        transcription: 'Вэ́о эн эль систэ́ма кэ сэ кэдо́ эн ла эска́ла. Йегара́ эн эль вуэ́ло дэ э́ста но́чэ.',
      },
      {
        speakerId: 'person2',
        textEs: '¿Me lo pueden llevar a la dirección de mi hotel?',
        textRu: 'Вы сможете доставить его по адресу моего отеля?',
        transcription: '¿Мэ ло пуэ́дэн йева́р а ла дирэксьо́н дэ ми отэ́ль?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, apunte aquí la dirección y su teléfono. Se lo llevamos gratis.',
        textRu: 'Да, запишите здесь адрес и телефон. Мы доставим его бесплатно.',
        transcription: 'Си, апу́нтэ аки́ ла дирэксьо́н и су тэлэ́фоно. Сэ ло йева́мос гра́тис.',
      },
    ],
  },

  // ========================================================
  // 8. ПАСПОРТНЫЙ КОНТРОЛЬ С РАБОЧИМИ ДОКУМЕНТАМИ
  // ========================================================
  {
    id: 'diag-8',
    titleRu: 'Паспортный контроль: рабочая виза и контракт',
    category: 'travel',
    situation: 'Пограничный офицер задаёт вопросы о цели въезда в Испанию.',
    roles: {
      person1: { nameRu: 'Офицер пограничной службы', nameEs: 'Policía de Fronteras', roleRu: 'Офицер' },
      person2: { nameRu: 'Владимир (Въезжающий)', nameEs: 'Vladimir (Trabajador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Buenas tardes. Su pasaporte, por favor. ¿Cuál es el motivo de su viaje a España?',
        textRu: 'Добрый день. Ваш паспорт, пожалуйста. Какова цель вашей поездки в Испанию?',
        transcription: 'Буэ́нас та́рдэс. Су пасапо́ртэ, пор фаво́р. ¿Куа́ль эс эль моти́во дэ су вья́хэ а Эспа́нья?',
      },
      {
        speakerId: 'person2',
        textEs: 'Buenas tardes. Vengo con visado de trabajo como soldador. Aquí tiene mi contrato.',
        textRu: 'Добрый день. Я въезжаю по рабочей визе сварщиком. Вот мой контракт.',
        transcription: 'Буэ́нас та́рдэс. Вэ́нго кон виса́до дэ траба́хо ко́мо сольдадо́р. Аки́ тье́нэ ми контра́то.',
        trainingOptions: [
          {
            textEs: 'Vengo con visado de trabajo como soldador. Aquí tiene mi contrato.',
            textRu: 'Я въезжаю по рабочей визе сварщиком. Вот контракт.',
            isCorrect: true,
          },
          {
            textEs: 'Vengo de vacaciones a la playa.',
            textRu: 'Я приехал на каникулы на пляж.',
            isCorrect: false,
            explanation: 'Нельзя врать пограничнику при наличии рабочего контракта.',
          },
        ],
      },
      {
        speakerId: 'person1',
        textEs: '¿Para qué empresa va a trabajar y en qué ciudad?',
        textRu: 'В какой компании будете работать и в каком городе?',
        transcription: '¿Па́ра кэ эмпрэ́са ва а трабаха́р и эн кэ сиуда́д?',
      },
      {
        speakerId: 'person2',
        textEs: 'En Construcciones Metálicas García, en Madrid.',
        textRu: 'В компании Конструксьонес Металикас Гарсия, в Мадриде.',
        transcription: 'Эн Конструксьо́нэс Мэтали́кас Гарси́а, эн Мадри́д.',
      },
      {
        speakerId: 'person1',
        textEs: 'Todo en regla. Bienvenido a España.',
        textRu: 'Всё в порядке. Добро пожаловать в Испанию.',
        transcription: 'То́до эн рэ́гла. Бьенвэни́до а Эспа́нья.',
      },
    ],
  },

  // ========================================================
  // 9. ПОЕЗДКА НА ТАКСИ ДО ОТЕЛЯ
  // ========================================================
  {
    id: 'diag-9',
    titleRu: 'Такси: поездка из аэропорта по адресу',
    category: 'travel',
    situation: 'Вы садитесь в такси у терминала аэропорта и называете адрес.',
    roles: {
      person1: { nameRu: 'Водитель такси', nameEs: 'Taxista', roleRu: 'Таксист' },
      person2: { nameRu: 'Владимир (Пассажир)', nameEs: 'Vladimir (Pasajero)', roleRu: 'Пассажир' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Hola, buenas tardes. ¿Está libre?',
        textRu: 'Здравствуйте, добрый день. Вы свободны?',
        transcription: 'О́ла, буэ́нас та́рдэс. ¿Эста́ ли́брэ?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, adelante. ¿A dónde le llevo?',
        textRu: 'Да, садитесь. Куда вас отвезти?',
        transcription: 'Си, адэла́нтэ. ¿А до́ндэ лэ йе́во?',
      },
      {
        speakerId: 'person2',
        textEs: 'Lléveme a esta dirección, por favor: Calle de Alcalá, número 150.',
        textRu: 'Отвезите меня по этому адресу, пожалуйста: улица Алькала, номер 150.',
        transcription: 'Йе́вэмэ а э́ста дирэксьо́н, пор фаво́р: Ка́йе дэ Алькала́, ну́мэро сье́нто синкуэ́нта.',
      },
      {
        speakerId: 'person1',
        textEs: 'De acuerdo. ¿Tiene maletas en el maletero?',
        textRu: 'Хорошо. У вас есть чемоданы в багажник?',
        transcription: 'Дэ акуэ́рдо. ¿Тье́нэ мале́тас эн эль малэтэ́ро?',
      },
      {
        speakerId: 'person2',
        textEs: 'Sí, una maleta. ¿Puedo pagar con tarjeta al llegar?',
        textRu: 'Да, один чемодан. Можно будет оплатить картой по прибытии?',
        transcription: 'Си, у́на мале́та. ¿Пуэ́до пага́р кон тархэ́та аль йега́р?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, todos los taxis de Madrid llevan datáfono para tarjeta.',
        textRu: 'Да, во всех такси Мадрида есть терминал для банковских карт.',
        transcription: 'Си, то́дос лос та́ксис дэ Мадри́д йе́ван дата́фоно па́ра тархэ́та.',
      },
    ],
  },

  // ========================================================
  // 10. В ОТЕЛЕ: ЗАСЕЛЕНИЕ И КОНДИЦИОНЕР
  // ========================================================
  {
    id: 'diag-10',
    titleRu: 'В отеле: заселение и проблема с кондиционером',
    category: 'hotel',
    situation: 'Заселение на ресепшен и вызов мастера для починки кондиционера.',
    roles: {
      person1: { nameRu: 'Администратор отеля', nameEs: 'Recepcionista', roleRu: 'Администратор' },
      person2: { nameRu: 'Владимир (Гость)', nameEs: 'Vladimir (Huésped)', roleRu: 'Гость' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Buenas tardes. Tengo una reserva a nombre de Vladimir.',
        textRu: 'Добрый день. У меня есть бронирование на имя Владимир.',
        transcription: 'Буэ́нас та́рдэс. Тэ́нго у́на рэсэ́рва а но́мбрэ дэ Алэксэ́й.',
      },
      {
        speakerId: 'person1',
        textEs: 'Aquí la tengo, habitación 304. Aquí tiene la llave y la clave del wifi.',
        textRu: 'Да, вижу, номер 304. Вот ваш ключ и пароль от Wi-Fi.',
        transcription: 'Аки́ ла тэ́нго, абитасьо́н трэссье́нтос куа́тро. Аки́ тье́нэ ла йя́вэ и ла кла́вэ дэль ва́йфай.',
      },
      {
        speakerId: 'person2',
        textEs: 'Gracias. (Спустя час): Perdone, el aire acondicionado de la habitación no funciona.',
        textRu: 'Спасибо. (Спустя час): Простите, в номере не работает кондиционер.',
        transcription: 'Гра́сьяс. Пэрдо́нэ, эль а́йрэ акондисьона́до дэ ла абитасьо́н но фунсьо́на.',
      },
      {
        speakerId: 'person1',
        textEs: 'Disculpe la molestia. Ahora mismo mando al técnico de mantenimiento a revisarlo.',
        textRu: 'Прошу прощения за неудобство. Сейчас же отправлю мастера проверить.',
        transcription: 'Диску́льпэ ла моле́стья. Ао́ра ми́смо ма́ндо аль тэ́книко дэ мантэнимье́нто а рэвиса́рло.',
      },
      {
        speakerId: 'person2',
        textEs: 'Muchas gracias. Y por favor, ¿a qué hora es el desayuno mañana?',
        textRu: 'Большое спасибо. И скажите, пожалуйста, во сколько завтра завтрак?',
        transcription: 'Му́час гра́сьяс. И пор фаво́р, ¿а кэ о́ра эс эль дэсайю́но манья́на?',
      },
      {
        speakerId: 'person1',
        textEs: 'De 7:00 a 10:30 en el comedor de la planta baja.',
        textRu: 'С 7:00 до 10:30 в столовой на первом этаже.',
        transcription: 'Дэ сье́тэ а дьес и мэ́дья эн эль комэдо́р дэ ла пла́нта ба́ха.',
      },
    ],
  },

  // ========================================================
  // 11. АРЕНДА КОМНАТЫ: ЗВОНОК ХОЗЯИНУ КВАРТИРЫ
  // ========================================================
  {
    id: 'diag-11',
    titleRu: 'Аренда жилья: звонок о просмотре комнаты',
    category: 'housing',
    situation: 'Вы звоните хозяину по объявлению об аренде комнаты рядом с промзоной.',
    roles: {
      person1: { nameRu: 'Хозяин квартиры (Карлос)', nameEs: 'Carlos (Propietario)', roleRu: 'Арендодатель' },
      person2: { nameRu: 'Владимир (Арендатор)', nameEs: 'Vladimir (Inquilino)', roleRu: 'Арендатор' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Hola Carlos, buenas tardes. Llamo por la habitación que tiene en alquiler.',
        textRu: 'Здравствуйте, Карлос. Звоню по поводу комнаты, которую вы сдаёте.',
        transcription: 'О́ла Ка́рлос, буэ́нас та́рдэс. Йя́мо пор ла абитасьо́н кэ тье́нэ эн алькиле́р.',
      },
      {
        speakerId: 'person1',
        textEs: 'Hola. Sí, la habitación sigue libre. Son 350 euros con gastos incluidos.',
        textRu: 'Здравствуйте. Да, комната пока свободна. 350 евро с коммунальными услугами.',
        transcription: 'О́ла. Си, ла абитасьо́н си́гэ ли́брэ. Сон трэссье́нтос синкуэ́нта э́урос кон га́стос инклуи́дос.',
      },
      {
        speakerId: 'person2',
        textEs: 'Trabajo como soldador en el polígono. ¿Se pide fianza y se puede hacer empadronamiento?',
        textRu: 'Я работаю сварщиком в промзоне. Требуется ли залог и возможна ли прописка?',
        transcription: 'Траба́хо ко́мо сольдадо́р эн эль поли́гоно. ¿Сэ пи́дэ фья́нса и сэ пуэ́дэ асэ́р эмпадронамье́нто?',
      },
      {
        speakerId: 'person1',
        textEs: 'Pido un mes de fianza y sí, no tengo problema con el empadronamiento si firmas contrato.',
        textRu: 'Я прошу один месяц залога, и да, без проблем с пропиской при подписании договора.',
        transcription: 'Пи́до ун мэ́с дэ фья́нса и си, но тэ́нго пробле́ма кон эль эмпадронамье́нто си фи́рмас контра́то.',
      },
      {
        speakerId: 'person2',
        textEs: 'Estupendo. ¿Cuándo puedo pasar a ver el piso?',
        textRu: 'Замечательно. Когда я могу прийти посмотреть квартиру?',
        transcription: 'Эступэ́ндо. ¿Куа́ндо пуэ́до паса́р а вэ́р эль пи́со?',
      },
      {
        speakerId: 'person1',
        textEs: 'Hoy a las siete de la tarde me viene perfecto.',
        textRu: 'Сегодня в семь вечера мне отлично подходит.',
        transcription: 'Ой а лас сье́тэ дэ ла та́рдэ мэ вье́нэ пэрфэ́кто.',
      },
    ],
  },

  // ========================================================
  // 12. В РЕСТОРАНЕ: ЗАКАЗ MENÚ DEL DÍA
  // ========================================================
  {
    id: 'diag-12',
    titleRu: 'В ресторане: комплексный обед и счёт',
    category: 'food',
    situation: 'Обед в испанском кафе: выбор первого, второго, напитка и оплата картой.',
    roles: {
      person1: { nameRu: 'Официант', nameEs: 'Camarero', roleRu: 'Официант' },
      person2: { nameRu: 'Владимир (Посетитель)', nameEs: 'Vladimir (Cliente)', roleRu: 'Клиент' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: '¡Hola! ¿Mesa para uno? Aquí tiene la carta con el menú del día.',
        textRu: 'Здравствуйте! Столик на одного? Вот меню дня.',
        transcription: '¡О́ла! ¿Мэ́са па́ра у́но? Аки́ тье́нэ ла ка́рта кон эль мэну́ дэль ди́а.',
      },
      {
        speakerId: 'person2',
        textEs: 'Gracias. ¿Qué me recomienda de primero?',
        textRu: 'Спасибо. Что вы порекомендуете на первое?',
        transcription: 'Гра́сьяс. ¿Кэ мэ рэкомье́нда дэ примэ́ро?',
      },
      {
        speakerId: 'person1',
        textEs: 'El gazpacho andaluz o los macarrones con tomate y queso.',
        textRu: 'Андалузский гаспачо или макароны с томатом и сыром.',
        transcription: 'Эль гаспа́чо андалу́с о лос макарро́нэс кон тома́тэ и кэ́со.',
      },
      {
        speakerId: 'person2',
        textEs: 'Los macarrones de primero. Y de segundo, bistec de ternera al punto, por favor.',
        textRu: 'Макароны на первое. А на второе — говяжий бифштекс средней прожарки, пожалуйста.',
        transcription: 'Лос макарро́нэс дэ примэ́ро. И дэ сэгу́ндо, бистэ́к дэ тэрнэ́ра аль пу́нто, пор фаво́р.',
      },
      {
        speakerId: 'person1',
        textEs: '¿Para beber agua con o sin gas?',
        textRu: 'Из напитков — воду с газом или без?',
        transcription: '¿Па́ра бэбэ́р а́гуа кон о син гас?',
      },
      {
        speakerId: 'person2',
        textEs: 'Agua sin gas, por favor. Y más tarde, la cuenta. ¿Puedo pagar con tarjeta?',
        textRu: 'Воду без газа, пожалуйста. И позже счёт. Можно оплатить картой?',
        transcription: 'А́гуа син гас, пор фаво́р. И мас та́рдэ, ла куэ́нта. ¿Пуэ́до пага́р кон тархэ́та?',
      },
    ],
  },

  // ========================================================
  // 13. ПОКУПКА SIM-КАРТЫ
  // ========================================================
  {
    id: 'diag-13',
    titleRu: 'Магазин связи: покупка SIM-карты с интернетом',
    category: 'city',
    situation: 'Покупка предоплатной испанской SIM-карты с большим пакетом интернета.',
    roles: {
      person1: { nameRu: 'Продавец салона связи', nameEs: 'Dependiente', roleRu: 'Консультант' },
      person2: { nameRu: 'Владимир (Покупатель)', nameEs: 'Vladimir (Cliente)', roleRu: 'Клиент' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Hola, buenos días. Quiero comprar una tarjeta prepago con muchos gigas.',
        textRu: 'Здравствуйте, добрый день. Я хочу купить предоплаченную SIM-карту с большим объёмом интернета.',
        transcription: 'О́ла, буэ́нос ди́ас. Кье́ро компра́р у́на тархэ́та прэпа́го кон му́чос ги́гас.',
      },
      {
        speakerId: 'person1',
        textEs: 'Tenemos una tarifa de 50 gigas y llamadas ilimitadas por quince euros al mes.',
        textRu: 'У нас есть тариф на 50 гигабайт и безлимитные звонки за 15 евро в месяц.',
        transcription: 'Тэнэ́мос у́на тари́фа дэ синкуэ́нта ги́гас и йяма́дас илимита́дас пор ки́нсэ э́урос аль мэ́с.',
      },
      {
        speakerId: 'person2',
        textEs: 'Me parece perfecta. Aquí tiene mi pasaporte para registrarla.',
        textRu: 'Мне отлично подходит. Вот мой паспорт для регистрации.',
        transcription: 'Мэ парэ́сэ пэрфэ́кта. Аки́ тье́нэ ми пасапо́ртэ па́ра рэхистра́рла.',
      },
      {
        speakerId: 'person1',
        textEs: 'Listo. La introduzco en su teléfono y comprobamos la conexión de datos.',
        textRu: 'Готово. Вставляю в ваш телефон и проверяем передачу данных.',
        transcription: 'Ли́сто. Ла интроду́ско эн су тэлэ́фоно и компроба́мос ла конэксио́н дэ да́тос.',
      },
      {
        speakerId: 'person2',
        textEs: '¿Cómo puedo recargar el saldo el próximo mes?',
        textRu: 'Как я смогу пополнить баланс в следующем месяце?',
        transcription: '¿Ко́мо пуэ́до рэкарга́р эль са́льдо эль про́ксимо мэ́с?',
      },
      {
        speakerId: 'person1',
        textEs: 'Por internet con tarjeta bancaria o en cualquier estanco o supermercado.',
        textRu: 'Через интернет банковской картой или в любом табачном киоске (estanco) и супермаркете.',
        transcription: 'Пор интэрнэ́т кон тархэ́та банка́рья о эн куалькье́р эста́нко о супэрмарка́до.',
      },
    ],
  },

  // ========================================================
  // 14. ВИЗИТ В АПТЕКУ ПРИ ОЖОГЕ ГЛАЗ ОТ СВАРКИ
  // ========================================================
  {
    id: 'diag-14',
    titleRu: 'Аптека: капли для глаз от вспышек сварки',
    category: 'city',
    situation: 'После работы глаза болят и слезятся от вспышек («нахватался зайчиков»).',
    roles: {
      person1: { nameRu: 'Фармацевт', nameEs: 'Farmacéutico', roleRu: 'Фармацевт' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Buenas tardes. Trabajo como soldador y me arden mucho los ojos por la radiación del arco.',
        textRu: 'Добрый день. Я работаю сварщиком, и у меня сильно жжёт глаза от сварочной дуги.',
        transcription: 'Буэ́нас та́рдэс. Траба́хо ко́мо сольдадо́р и мэ а́рдэн му́чо лос о́хос пор ла радиасьо́н дэль а́рко.',
      },
      {
        speakerId: 'person1',
        textEs: '¿Tiene sensación de arena en los ojos o lagrimeo continuo?',
        textRu: 'Ощущение песка в глазах или постоянное слезотечение?',
        transcription: '¿Тье́нэ сэнсасьо́н дэ арэ́на эн лос о́хос о лагримэ́о конти́нуо?',
      },
      {
        speakerId: 'person2',
        textEs: 'Sí, exactamente. ¿Tiene algún colirio calmante sin receta?',
        textRu: 'Да, именно так. У вас есть успокаивающие глазные капли без рецепта?',
        transcription: 'Си, эксактаме́нтэ. ¿Тье́нэ альгу́н коли́рьо кальма́нтэ син рэсэ́та?',
      },
      {
        speakerId: 'person1',
        textEs: 'Tome estas gotas lubricantes con ácido hialurónico. Póngase dos gotas cada cuatro horas.',
        textRu: 'Возьмите эти увлажняющие капли с гиалуроновой кислотой. Капайте по две капли каждые 4 часа.',
        transcription: 'То́мэ э́стас го́тас лубрика́нтэс кон а́сидо иалуро́нико. По́нгасэ дос го́тас ка́да куа́тро о́рас.',
      },
      {
        speakerId: 'person2',
        textEs: 'Muchas gracias. Y si el dolor persiste, ¿voy al médico de urgencias?',
        textRu: 'Большое спасибо. А если боль не пройдёт, обратиться в неотложку?',
        transcription: 'Му́час гра́сьяс. И си эль доло́р пэрси́стэ, ¿вой аль мэ́дико дэ ургэ́нсьяс?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, si mañana sigue doliendo, vaya al centro de salud para descartar una lesión en la córnea.',
        textRu: 'Да, если завтра продолжит болеть, сходите к врачу исключить ожог роговицы.',
        transcription: 'Си, си манья́на си́гэ долье́ндо, ва́йя аль сэ́нтро дэ салю́д па́ра дэскарта́р у́на лэсьо́н эн ла ко́рнэа.',
      },
    ],
  },

  // ========================================================
  // 15. МЭРИЯ: ОФОРМЛЕНИЕ ПРОПИСКИ (EMPADRONAMIENTO)
  // ========================================================
  {
    id: 'diag-15',
    titleRu: 'Мэрия: подача документов на прописку',
    category: 'documents',
    situation: 'Визит в Ayuntamiento для получения сертификата empadronamiento.',
    roles: {
      person1: { nameRu: 'Сотрудник мэрии', nameEs: 'Funcionario', roleRu: 'Сотрудник' },
      person2: { nameRu: 'Владимир (Заявитель)', nameEs: 'Vladimir (Solicitante)', roleRu: 'Заявитель' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Buenos días. Tengo cita previa para empadronamiento a las diez.',
        textRu: 'Доброе утро. У меня запись на прописку на 10 часов.',
        transcription: 'Буэ́нос ди́ас. Тэ́нго си́та прэ́вья па́ра эмпадронамье́нто а лас дьес.',
      },
      {
        speakerId: 'person1',
        textEs: 'Buenos días. Su pasaporte original y el contrato de alquiler de la vivienda, por favor.',
        textRu: 'Доброе утро. Ваш оригинал паспорта и договор аренды жилья, пожалуйста.',
        transcription: 'Буэ́нос ди́ас. Су пасапо́ртэ орихина́ль и эль контра́то дэ алькиле́р дэ ла вивье́нда, пор фаво́р.',
      },
      {
        speakerId: 'person2',
        textEs: 'Aquí tiene el contrato firmado y el último recibo del pago del alquiler.',
        textRu: 'Вот подписанный договор и последняя квитанция об оплате аренды.',
        transcription: 'Аки́ тье́нэ эль контра́то фирма́до и эль у́льтимо рэси́бо дэль па́го дэль алькиле́р.',
      },
      {
        speakerId: 'person1',
        textEs: 'Firme aquí la solicitud. Le entrego el volante de empadronamiento con firma digital.',
        textRu: 'Распишитесь здесь в заявлении. Выдаю вам справку о прописке с цифровой подписью.',
        transcription: 'Фи́рмэ аки́ ла солиситу́д. Лэ энтрэ́го эль вола́нтэ дэ эмпадронамье́нто кон фи́рма дихита́ль.',
      },
      {
        speakerId: 'person2',
        textEs: '¡Muchas gracias por su ayuda! Que tenga un buen día.',
        textRu: 'Большое спасибо за помощь! Всего вам доброго.',
        transcription: '¡Му́час гра́сьяс пор су айю́да! Кэ тэ́нга ун буэн ди́а.',
      },
    ],
  },
];

import { extraDialogues } from './extraDialoguesData';

export const allDialogues: DialogueItem[] = [
  ...dialoguesData,
  ...extraDialogues,
];

