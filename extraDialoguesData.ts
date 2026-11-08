/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DialogueItem } from './types';

export const extraDialogues: DialogueItem[] = [
  // 16. Практический тест на сварку в цехе
  {
    id: 'diag-16',
    titleRu: 'Практический тест в цехе перед приёмом',
    category: 'welder',
    situation: 'Мастер цеха даёт заготовки для пробного шва полуавтоматом.',
    roles: {
      person1: { nameRu: 'Мастер цеха', nameEs: 'Maestro de taller', roleRu: 'Мастер' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Vladimir, aquí tienes dos chapas biseladas de diez milímetros. Haz un pase de raíz y dos de relleno.',
        textRu: 'Владимир, вот две пластины с разделкой кромок 10 мм. Сделай корневой проход и два заполняющих.',
        transcription: 'Алэксэ́й, аки́ тье́нэс дос ча́пас бисэла́дас дэ дьес милимэ́трос.',
      },
      {
        speakerId: 'person2',
        textEs: 'Muy bien. ¿A qué voltaje e intensidad suele trabajar esta máquina?',
        textRu: 'Хорошо. На каком напряжении и токе обычно работает этот аппарат?',
        transcription: 'Муй бьен. ¿А кэ вольта́хэ э интэнсида́д суэ́лэ трабаха́р э́ста ма́кина?',
      },
      {
        speakerId: 'person1',
        textEs: 'Prueba a 22 voltios y unos 180 amperios con mezcla estándar.',
        textRu: 'Попробуй на 22 вольта и около 180 ампер на стандартной смеси.',
        transcription: 'Пруэ́ба а вэинтидо́с во́льтиос и у́нос сье́нто очэ́нта ампэ́рьос.',
      },
      {
        speakerId: 'person2',
        textEs: 'Perfecto. Me pongo la pantalla y los guantes y empiezo a puntear.',
        textRu: 'Отлично. Надеваю маску и краги и начинаю прихватывать.',
        transcription: 'Пэрфэ́кто. Мэ по́нго ла панта́йя и лос гуа́нтэс и эмпье́со а пунтэа́р.',
      },
      {
        speakerId: 'person1',
        textEs: 'Buen cordón, buena penetración y sin mordeduras. Quedas contratado.',
        textRu: 'Хороший шов, отличный провар и без подрезов. Ты принят на работу.',
        transcription: 'Буэн кордо́н, буэ́на пэнэтрасьо́н и син мордэду́рас. Кэ́дас контрата́до.',
      },
      {
        speakerId: 'person2',
        textEs: '¡Muchas gracias por la oportunidad! No les defraudaré.',
        textRu: 'Большое спасибо за возможность! Я вас не подведу.',
        transcription: '¡Му́час гра́сьяс пор ла опортунида́д! Но лэс дэфраударэ́.',
      },
    ],
  },

  // 17. Отраслевое соглашение Convenio del Metal
  {
    id: 'diag-17',
    titleRu: 'Отдел кадров: металлургическое соглашение (Convenio)',
    category: 'welder',
    situation: 'Объяснение тарифной сетки и прав рабочего по испанскому металлургическому соглашению.',
    roles: {
      person1: { nameRu: 'Инспектор по кадрам', nameEs: 'Gestor laboral', roleRu: 'Кадровик' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Tu categoría profesional en nómina es Oficial de Primera Soldador.',
        textRu: 'Твоя профессиональная категория в табеле — Сварщик 1-го разряда (Oficial de Primera).',
        transcription: 'Ту катэгори́а профэсьона́ль эн но́мина эс Офисья́ль дэ Примэ́ра Сольдадо́р.',
      },
      {
        speakerId: 'person2',
        textEs: '¿Cuántos días de vacaciones pagadas tengo al año?',
        textRu: 'Сколько дней оплачиваемого отпуска у меня в год?',
        transcription: '¿Куа́нтос ди́ас дэ вакасьо́нэс пага́дас тэ́нго аль а́ньо?',
      },
      {
        speakerId: 'person1',
        textEs: 'Tienes treinta días naturales, normalmente disfrutados en agosto y Navidad.',
        textRu: '30 календарных дней, обычно берутся в августе и на Рождество.',
        transcription: 'Тье́нэс трэ́инта ди́ас натура́лэс.',
      },
      {
        speakerId: 'person2',
        textEs: 'Entendido. ¿Y cuántas pagas extraordinarias corresponden?',
        textRu: 'Понял. А сколько дополнительных выплат (тринадцатых зарплат) положено?',
        transcription: 'Энтэнди́до. ¿И куа́нтас па́гас экстраордина́рьяс коррэспо́ндэн?',
      },
      {
        speakerId: 'person1',
        textEs: 'Dos pagas extras al año, prorrateadas cada mes en tu nómina.',
        textRu: 'Две дополнительные выплаты в год, равномерно распределённые по месяцам.',
        transcription: 'Дос па́гас э́кстрас аль а́ньо, прорратэа́дас ка́да мэ́с.',
      },
    ],
  },

  // 18. Заказ расходных материалов на складе цеха
  {
    id: 'diag-18',
    titleRu: 'Склад цеха: получение дисков и сопел',
    category: 'welder',
    situation: 'Вы пришли к кладовщику цеха за новыми расходниками.',
    roles: {
      person1: { nameRu: 'Кладовщик', nameEs: 'Almacenero', roleRu: 'Кладовщик' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Hola. Necesito cinco discos de corte de 125 y dos toberas para la antorcha.',
        textRu: 'Привет. Мне нужно 5 отрезных дисков на 125 и два сопла для горелки.',
        transcription: 'О́ла. Нэсэси́то си́нко ди́скос дэ ко́ртэ дэ сье́нто вэинтиси́нко и дос тобэ́рас па́ра ла анто́рча.',
      },
      {
        speakerId: 'person1',
        textEs: 'Aquí tienes los discos. ¿Las toberas son cónicas o cilíndricas?',
        textRu: 'Вот диски. Сопла конические или цилиндрические?',
        transcription: 'Аки́ тье́нэс лос ди́скос. ¿Лас тобэ́рас сон ко́никас о сили́ндрикас?',
      },
      {
        speakerId: 'person2',
        textEs: 'Cónicas, por favor. Y también un espray antiproyecciones.',
        textRu: 'Конические, пожалуйста. И ещё антипригарный спрей.',
        transcription: 'Ко́никас, пор фаво́р. И тамбье́н ун эспра́й антипройэксьо́нэс.',
      },
      {
        speakerId: 'person1',
        textEs: 'Toma el bote de espray. Firma aquí la hoja de entrega de material.',
        textRu: 'Держи баллончик спрея. Распишись здесь в бланке выдачи материалов.',
        transcription: 'То́ма эль бо́тэ дэ эспра́й. Фи́рма аки́ ла о́ха дэ энтрэ́га дэ матэрья́ль.',
      },
    ],
  },

  // 19. Разговор за обедом в столовой с коллегами
  {
    id: 'diag-19',
    titleRu: 'Обеденный перерыв с испанскими коллегами',
    category: 'welder',
    situation: 'Вы обедаете за столом в цеху вместе с коллегами-сварщиками.',
    roles: {
      person1: { nameRu: 'Педро (Коллега-сварщик)', nameEs: 'Pedro (Compañero)', roleRu: 'Коллега' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: '¡Hombre, Vladimir! Siéntate aquí con nosotros. ¿Qué tal el primer día?',
        textRu: 'О, Владимир! Садись с нами. Как тебе первый день?',
        transcription: '¡О́мбрэ, Алэксэ́й! Сье́нтатэ аки́ кон носо́трос. ¿Кэ таль эль примэ́р ди́а?',
      },
      {
        speakerId: 'person2',
        textEs: 'Muy bien, gracias. El taller está muy bien equipado. La gente es maja.',
        textRu: 'Очень хорошо, спасибо. Цех отлично оснащён. Люди очень приятные.',
        transcription: 'Муй бьен, гра́сьяс. Эль тайе́р эста́ муй бьен экипа́до. Ла хэ́нтэ эс ма́ха.',
      },
      {
        speakerId: 'person1',
        textEs: 'Aquí el ritmo es duro, pero si trabajas fino, don Manuel te cuida bien.',
        textRu: 'Темп тут плотный, но если варишь качественно, дон Мануэль хорошо ценит людей.',
        transcription: 'Аки́ эль ри́тмо эс ду́ро, пэ́ро си траба́хас фи́но, дон Мануэ́ль тэ куи́да бьен.',
      },
      {
        speakerId: 'person2',
        textEs: 'Sí, a mí me gusta la calidad. En mi país soldé cinco años en calderería pesada.',
        textRu: 'Да, я люблю качество. У себя на родине я 5 лет варил тяжёлые металлоконструкции.',
        transcription: 'Си, а ми мэ гу́ста ла калида́д. Эн ми паи́с сольдэ́ си́нко а́ньос эн кальдэрэри́а пэса́да.',
      },
      {
        speakerId: 'person1',
        textEs: 'Se nota en cómo coges la antorcha. Venga, tómate un café que en diez minutos volvemos.',
        textRu: 'Это видно по тому, как ты держишь горелку. Давай, выпей кофе, через 10 минут за работу.',
        transcription: 'Сэ но́та эн ко́мо ко́хэс ла анто́рча.',
      },
    ],
  },

  // 20. Конец смены: отметка в табеле (Fichar)
  {
    id: 'diag-20',
    titleRu: 'Окончание смены: табель и уборка поста',
    category: 'welder',
    situation: 'Завершение рабочего дня, выключение поста и отметка на выходе.',
    roles: {
      person1: { nameRu: 'Коллега', nameEs: 'Compañero', roleRu: 'Коллега' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Son las tres menos cinco. Hay que barrer el puesto y apagar las máquinas.',
        textRu: 'Без пяти три. Пора подмести рабочее место и выключить аппараты.',
        transcription: 'Сон лас трэс мэ́нос си́нко. Ай кэ баррэ́р эль пуэ́сто и апага́р лас ма́кинас.',
      },
      {
        speakerId: 'person2',
        textEs: 'Ya cerré el gas de la botella y recogí los cables de masa y antorcha.',
        textRu: 'Я уже перекрыл газ на баллоне и смотал кабели массы и горелки.',
        transcription: 'Йя сэррэ́ эль гас дэ ла ботэ́йя и рэкохи́ лос ка́блес дэ ма́са и анто́рча.',
      },
      {
        speakerId: 'person1',
        textEs: 'No te olvides de fichar la salida en la pantalla táctil de la entrada.',
        textRu: 'Не забудь отметиться на выход на сенсорном табло у проходной.',
        transcription: 'Но тэ ольви́дэс дэ фича́р ла сали́да эн ла панта́йя та́ктиль дэ ла энтра́да.',
      },
      {
        speakerId: 'person2',
        textEs: 'Sí, con mi tarjeta personal. ¡Hasta mañana, buen descanso!',
        textRu: 'Да, личной картой. До завтра, хорошего отдыха!',
        transcription: 'Си, кон ми тархэ́та пэрсона́ль. ¡А́ста манья́на, буэн дэска́нсо!',
      },
    ],
  },

  // 21. Досмотр безопасности в аэропорту: жидкости и ноутбук
  {
    id: 'diag-21',
    titleRu: 'Аэропорт: досмотр безопасности',
    category: 'travel',
    situation: 'Прохождение через металлодетектор и рентген ручной клади.',
    roles: {
      person1: { nameRu: 'Офицер безопасности', nameEs: 'Seguridad', roleRu: 'Офицер' },
      person2: { nameRu: 'Владимир (Пассажир)', nameEs: 'Vladimir (Pasajero)', roleRu: 'Пассажир' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Bandeja para objetos metálicos, reloj, monedas y cinturón, por favor.',
        textRu: 'Лоток для металлических предметов, часов, монет и ремня, пожалуйста.',
        transcription: 'Бандэ́ха па́ра обхэ́тос мэтали́кос, рэло́х, монэ́дас и синтуро́н, пор фаво́р.',
      },
      {
        speakerId: 'person2',
        textEs: '¿Saco el ordenador portátil y el teléfono móvil?',
        textRu: 'Доставать ноутбук и мобильный телефон?',
        transcription: '¿Са́ко эль ордэнадо́р порта́тиль и эль тэлэ́фоно мо́виль?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, en una bandeja separada. Y los líquidos en una bolsa transparente.',
        textRu: 'Да, в отдельный лоток. А жидкости в прозрачном пакете.',
        transcription: 'Си, эн у́на бандэ́ха сэпара́да. И лос ли́кидос эн у́на бо́льса транспарэ́нтэ.',
      },
      {
        speakerId: 'person2',
        textEs: 'No llevo líquidos, solo la ropa y el cargador.',
        textRu: 'У меня нет жидкостей, только одежда и зарядное устройство.',
        transcription: 'Но йе́во ли́кидос, со́ло ла ро́па и эль каргадо́р.',
      },
      {
        speakerId: 'person1',
        textEs: 'Pase por el arco detector. Perfecto, recoja sus pertenencias.',
        textRu: 'Проходите через рамку. Всё в порядке, забирайте ваши вещи.',
        transcription: 'Па́сэ пор эль а́рко дэтэкто́р. Пэрфэ́кто, рэко́ха сус пэртэнэ́нсьяс.',
      },
    ],
  },

  // 22. Выход на посадку (Boarding Gate)
  {
    id: 'diag-22',
    titleRu: 'Аэропорт: посадка в самолёт у гейта',
    category: 'travel',
    situation: 'Проверка посадочного талона сотрудником перед посадкой в рукав.',
    roles: {
      person1: { nameRu: 'Сотрудник на гейте', nameEs: 'Personal de embarque', roleRu: 'Сотрудник' },
      person2: { nameRu: 'Владимир (Пассажир)', nameEs: 'Vladimir (Pasajero)', roleRu: 'Пассажир' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Embarque para el vuelo IB3802 con destino Madrid. Pasajeros del grupo 3.',
        textRu: 'Посадка на рейс IB3802 до Мадрида. Пассажиры группы 3.',
        transcription: 'Эмба́ркэ па́ра эль вуэ́ло И-бэ трэс о́чо сэ́ро дос кон дэсти́но Мадри́д.',
      },
      {
        speakerId: 'person2',
        textEs: 'Hola, tengo el asiento 18C. Aquí está el código QR en mi teléfono.',
        textRu: 'Здравствуйте, у меня место 18C. Вот QR-код в моём телефоне.',
        transcription: 'О́ла, тэ́нго эль асье́нто дьесио́чо сэ. Аки́ эста́ эль ко́диго ку-эррэ эн ми тэлэ́фоно.',
      },
      {
        speakerId: 'person1',
        textEs: 'Muéstreme también la página de la foto de su pasaporte.',
        textRu: 'Покажите также страницу паспорта с фотографией.',
        transcription: 'Муэ́стрэмэ тамбье́н ла па́хина дэ ла фо́то дэ су пасапо́ртэ.',
      },
      {
        speakerId: 'person2',
        textEs: 'Aquí la tiene abierta.',
        textRu: 'Вот она, открыта.',
        transcription: 'Аки́ ла тье́нэ абье́рта.',
      },
      {
        speakerId: 'person1',
        textEs: 'Pase por el pasillo a la derecha. ¡Buen vuelo a Madrid!',
        textRu: 'Проходите по коридору направо. Приятного полёта в Мадрид!',
        transcription: 'Па́сэ пор эль паси́ййо а ла дэрэ́ча. ¡Буэн вуэ́ло а Мадри́д!',
      },
    ],
  },

  // 23. Автомат по продаже билетов в метро
  {
    id: 'diag-23',
    titleRu: 'Метро: помощь у автомата с билетами',
    category: 'city',
    situation: 'Вы покупаете транспортную карту в метро и спрашиваете контролёра.',
    roles: {
      person1: { nameRu: 'Контролёр метро', nameEs: 'Empleado de Metro', roleRu: 'Сотрудник' },
      person2: { nameRu: 'Владимир (Пассажир)', nameEs: 'Vladimir (Pasajero)', roleRu: 'Пассажир' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Disculpe, ¿cómo saco la tarjeta Multi para el metro y autobús?',
        textRu: 'Извините, как купить карту Multi для метро и автобуса?',
        transcription: 'Диску́льпэ, ¿ко́мо са́ко ла тархэ́та Му́льти па́ра эль мэ́тро и аутобу́с?',
      },
      {
        speakerId: 'person1',
        textEs: 'Seleccione en la pantalla "Adquirir tarjeta" y luego cargue el abono de 10 viajes.',
        textRu: 'Выберите на экране "Купить карту" и затем загрузите билет на 10 поездок.',
        transcription: 'Сэлэксьо́нэ эн ла панта́йя "Адквири́р тархэ́та" и луэ́го ка́ргэ эль або́но дэ дьес вья́хэс.',
      },
      {
        speakerId: 'person2',
        textEs: '¿Puedo pagar con tarjeta bancaria sin contacto (contactless)?',
        textRu: 'Можно оплатить бесконтактной банковской картой?',
        transcription: '¿Пуэ́до пага́р кон тархэ́та банка́рья син конта́кто?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, acerque su tarjeta al datáfono cuando se encienda la luz verde.',
        textRu: 'Да, приложите карту к терминалу, когда загорится зелёный огонёк.',
        transcription: 'Си, асэ́ркэ су тархэ́та аль дата́фоно.',
      },
      {
        speakerId: 'person2',
        textEs: 'Muchas gracias por la explicación.',
        textRu: 'Большое спасибо за разъяснение.',
        transcription: 'Му́час гра́сьяс пор ла экспликасьо́н.',
      },
    ],
  },

  // 24. Автобус в промышленную зону
  {
    id: 'diag-24',
    titleRu: 'Автобус: уточнение маршрута в промзону',
    category: 'city',
    situation: 'Вы уточняете у водителя пригородного автобуса нужную остановку в цеховом секторе.',
    roles: {
      person1: { nameRu: 'Водитель автобуса', nameEs: 'Conductor', roleRu: 'Водитель' },
      person2: { nameRu: 'Владимир (Пассажир)', nameEs: 'Vladimir (Pasajero)', roleRu: 'Пассажир' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Hola, buenos días. ¿Este autobús pasa por el Polígono Industrial de San Fernando?',
        textRu: 'Здравствуйте. Этот автобус идёт через промзону Сан-Фернандо?',
        transcription: 'О́ла, буэ́нос ди́ас. ¿Э́стэ аутобу́с па́са пор эль Поли́гоно Индустриа́ль дэ Сан Фэрна́ндо?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, hace tres paradas dentro del polígono. ¿A qué nave vas?',
        textRu: 'Да, делает три остановки внутри промзоны. К какому ангару/цеху едете?',
        transcription: 'Си, а́сэ трэс пара́дас дэ́нтро дэль поли́гоно. ¿А кэ на́вэ вас?',
      },
      {
        speakerId: 'person2',
        textEs: 'A la nave de Calderería y Soldadura García. ¿Me puede avisar al llegar?',
        textRu: 'К цеху Кальдерерия и Сольдадура Гарсия. Вы можете подсказать, когда будет остановка?',
        transcription: 'А ла на́вэ дэ Кальдэрэри́а и Сольдаду́ра Гарси́а. ¿Мэ пуэ́дэ ависа́р аль йега́р?',
      },
      {
        speakerId: 'person1',
        textEs: 'Es la parada de la Avenida de los Metales. Te aviso por el altavoz.',
        textRu: 'Это остановка Авенида де лос Металес. Я объявлю по громкой связи.',
        transcription: 'Эс ла пара́да дэ ла Авэни́да дэ лос Мэта́лэс.',
      },
      {
        speakerId: 'person2',
        textEs: 'Muy amable, muchas gracias.',
        textRu: 'Очень любезно, спасибо большое.',
        transcription: 'Муй ама́бле, му́час гра́сьяс.',
      },
    ],
  },

  // 25. Отель: просьба оставить чемодан на хранение
  {
    id: 'diag-25',
    titleRu: 'Отель: камера хранения после выселения',
    category: 'hotel',
    situation: 'Вы выселились из номера в 11:00, но хотите оставить вещи до вечера.',
    roles: {
      person1: { nameRu: 'Сотрудник ресепшен', nameEs: 'Recepcionista', roleRu: 'Сотрудник' },
      person2: { nameRu: 'Владимир (Гость)', nameEs: 'Vladimir (Huésped)', roleRu: 'Гость' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Buenos días. Dejo la llave de la habitación 205. ¿Puedo dejar aquí mi maleta hasta las seis?',
        textRu: 'Доброе утро. Сдаю ключ от 205 номера. Могу я оставить чемодан здесь до шести вечера?',
        transcription: 'Буэ́нос ди́ас. Дэ́хо ла йя́вэ дэ ла абитасьо́н доссье́нтос си́нко. ¿Пуэ́до дэха́р аки́ ми мале́та а́ста лас сэ́ис?',
      },
      {
        speakerId: 'person1',
        textEs: 'Claro que sí, tenemos consigna gratuita para clientes.',
        textRu: 'Конечно, у нас бесплатная комната хранения багажа для гостей.',
        transcription: 'Кла́ро кэ си, тэнэ́мос конси́гна гратуи́та па́ра клиэ́нтэс.',
      },
      {
        speakerId: 'person2',
        textEs: 'Aquí tiene la maleta grande y la mochila.',
        textRu: 'Вот большой чемодан и рюкзак.',
        transcription: 'Аки́ тье́нэ ла мале́та гра́ндэ и ла мочи́ла.',
      },
      {
        speakerId: 'person1',
        textEs: 'Le doy este resguardo numerado para recogerlo después.',
        textRu: 'Выдаю вам этот номерной талон, чтобы забрать вещи позже.',
        transcription: 'Лэ дой э́стэ рэсгуа́рдо нумэра́до па́ра рэкохэ́рло дэспуэ́с.',
      },
      {
        speakerId: 'person2',
        textEs: 'Muchas gracias. Volveré por la tarde.',
        textRu: 'Большое спасибо. Я вернусь во второй половине дня.',
        transcription: 'Му́час гра́сьяс. Вольвэрэ́ пор ла та́рдэ.',
      },
    ],
  },

  // 26. Супермаркет: покупка сыра и ветчины на развес
  {
    id: 'diag-26',
    titleRu: 'Супермаркет: покупка продуктов на развес',
    category: 'food',
    situation: 'Вы заказываете нарезку сыра и ветчины в гастрономическом отделе.',
    roles: {
      person1: { nameRu: 'Продавец отдела', nameEs: 'Charcutero', roleRu: 'Продавец' },
      person2: { nameRu: 'Владимир (Покупатель)', nameEs: 'Vladimir (Cliente)', roleRu: 'Покупатель' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: '¡Hola! ¿A quién le toca? ¿Qué le pongo?',
        textRu: 'Здравствуйте! Чья очередь? Что вам положить?',
        transcription: '¡О́ла! ¿А кье́н лэ то́ка? ¿Кэ лэ по́нго?',
      },
      {
        speakerId: 'person2',
        textEs: 'Póngame trescientos gramos de queso semicurado en lonchas, por favor.',
        textRu: 'Положите мне 300 грамм полутвёрдого сыра ломтиками, пожалуйста.',
        transcription: 'По́нгамэ трэссье́нтос гра́мос дэ кэ́со сэмикура́до эн ло́нчас, пор фаво́р.',
      },
      {
        speakerId: 'person1',
        textEs: 'Muy bien. ¿Algo más de embutido o jamón?',
        textRu: 'Хорошо. Что-то ещё из колбасных изделий или хамона?',
        transcription: 'Муй бьен. ¿А́льго мас дэ эмбути́до о хамо́н?',
      },
      {
        speakerId: 'person2',
        textEs: 'Sí, un cuarto de kilo de pechuga de pavo también finita.',
        textRu: 'Да, четверть килограмма филе индейки, тоже тонкой нарезкой.',
        transcription: 'Си, ун куа́рто дэ ки́ло дэ пэчу́га дэ па́во тамбье́н фини́та.',
      },
      {
        speakerId: 'person1',
        textEs: 'Aquí tiene los dos paquetes. ¡Que aproveche!',
        textRu: 'Вот две упаковки. Приятного аппетита!',
        transcription: 'Аки́ тье́нэ лос дос пакэ́тэс. ¡Кэ апровэ́чэ!',
      },
    ],
  },

  // 27. Супермаркет: касса и оплата
  {
    id: 'diag-27',
    titleRu: 'Супермаркет: касса, пакет и чек',
    category: 'food',
    situation: 'Кассир пробивает товары и спрашивает о пакете и чеке.',
    roles: {
      person1: { nameRu: 'Кассир', nameEs: 'Cajera', roleRu: 'Кассир' },
      person2: { nameRu: 'Владимир (Покупатель)', nameEs: 'Vladimir (Cliente)', roleRu: 'Покупатель' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Buenas tardes. ¿Va a querer bolsa de plástico o de papel?',
        textRu: 'Добрый день. Будете брать пакет — пластиковый или бумажный?',
        transcription: 'Буэ́нас та́рдэс. ¿Ва а кэрэ́р бо́льса дэ пла́стико о дэ папэ́ль?',
      },
      {
        speakerId: 'person2',
        textEs: 'Una bolsa grande de plástico, por favor.',
        textRu: 'Один большой пластиковый пакет, пожалуйста.',
        transcription: 'У́на бо́льса гра́ндэ дэ пла́стико, пор фаво́р.',
      },
      {
        speakerId: 'person1',
        textEs: 'Son dieciocho euros con cincuenta céntimos en total.',
        textRu: 'Итого 18 евро и 50 центов.',
        transcription: 'Сон дьесио́чо э́урос кон синкуэ́нта сэ́нтимос эн тота́ль.',
      },
      {
        speakerId: 'person2',
        textEs: 'Pago con tarjeta. ¿Me da el tíquet de compra?',
        textRu: 'Плачу картой. Дайте чек о покупке, пожалуйста.',
        transcription: 'Па́го кон тархэ́та. ¿Мэ да эль ти́кэт дэ ко́мпра?',
      },
      {
        speakerId: 'person1',
        textEs: 'Aquí tiene el tíquet y su copia de la tarjeta. ¡Hasta luego!',
        textRu: 'Вот чек и слип с терминала. До свидания!',
        transcription: 'Аки́ тье́нэ эль ти́кэт и су ко́пья дэ ла тархэ́та. ¡А́ста луэ́го!',
      },
    ],
  },

  // 28. Открытие банковского счёта для зарплаты (Nómina)
  {
    id: 'diag-28',
    titleRu: 'Банк: открытие счёта для зарплаты (Cuenta Nómina)',
    category: 'documents',
    situation: 'Визит в банк для оформления IBAN для начисления зарплаты с работы.',
    roles: {
      person1: { nameRu: 'Банковский сотрудник', nameEs: 'Empleado de banca', roleRu: 'Сотрудник' },
      person2: { nameRu: 'Владимир (Клиент)', nameEs: 'Vladimir (Cliente)', roleRu: 'Клиент' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Hola, buenos días. Vengo a abrir una cuenta bancaria para domiciliar mi nómina.',
        textRu: 'Здравствуйте. Я пришёл открыть счёт для начисления зарплаты (nómina).',
        transcription: 'О́ла, буэ́нос ди́ас. Вэ́нго а абри́р у́на куэ́нта банка́рья па́ра домисилья́р ми но́мина.',
      },
      {
        speakerId: 'person1',
        textEs: 'Perfecto. Necesito su pasaporte en vigor, su NIE y el contrato de trabajo.',
        textRu: 'Отлично. Мне потребуется действующий загранпаспорт, ваш номер NIE и трудовой контракт.',
        transcription: 'Пэрфэ́кто. Нэсэси́то су пасапо́ртэ эн виго́р, су ни́э и эль контра́то дэ траба́хо.',
      },
      {
        speakerId: 'person2',
        textEs: 'Aquí tengo los originales y también el volante de empadronamiento.',
        textRu: 'Вот оригиналы, а также справка о прописке.',
        transcription: 'Аки́ тэ́нго лос орихина́лэс и тамбье́н эль вола́нтэ дэ эмпадронамье́нто.',
      },
      {
        speakerId: 'person1',
        textEs: 'Estupendo. La cuenta nómina no tiene comisiones de mantenimiento. Le imprimo el número IBAN.',
        textRu: 'Замечательно. Зарплатный счёт без комиссий за обслуживание. Распечатываю номер счёта IBAN.',
        transcription: 'Эступэ́ндо. Ла куэ́нта но́мина но тье́нэ комисьо́нэс дэ мантэнимье́нто. Лэ импри́мо эль ну́мэро Ибан.',
      },
      {
        speakerId: 'person2',
        textEs: 'Muchas gracias. Este documento se lo entregaré al departamento de personal.',
        textRu: 'Большое спасибо. Этот документ я передам в отдел кадров предприятия.',
        transcription: 'Му́час гра́сьяс. Э́стэ докумэ́нто сэ ло энтрэгарэ́ аль дэпартамэ́нто дэ пэрсона́ль.',
      },
    ],
  },

  // 29. Заявление в полицию об утере телефона (Denuncia)
  {
    id: 'diag-29',
    titleRu: 'Полиция: заявление о краже или потере телефона',
    category: 'city',
    situation: 'Обращение в комиссариат Национальной полиции для получения справки о краже.',
    roles: {
      person1: { nameRu: 'Агент полиции', nameEs: 'Agente de Policía', roleRu: 'Полицейский' },
      person2: { nameRu: 'Владимир (Потерпевший)', nameEs: 'Vladimir (Denunciante)', roleRu: 'Заявитель' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Buenas tardes. Quiero poner una denuncia: me han sustraído el móvil en el metro.',
        textRu: 'Добрый день. Я хочу подать заявление: у меня украли телефон в метро.',
        transcription: 'Буэ́нас та́рдэс. Кье́ро понэ́р у́на дэну́нсья: мэ ан сустраи́до эль мо́виль эн эль мэ́тро.',
      },
      {
        speakerId: 'person1',
        textEs: 'Siéntese, por favor. ¿Cuál es su número de pasaporte o NIE?',
        textRu: 'Присаживайтесь, пожалуйста. Назовите номер вашего паспорта или NIE.',
        transcription: 'Сье́нтэсэ, пор фаво́р. ¿Куа́ль эс су ну́мэро дэ пасапо́ртэ о ни́э?',
      },
      {
        speakerId: 'person2',
        textEs: 'Aquí tiene mi pasaporte. El teléfono es un Samsung negro.',
        textRu: 'Вот мой паспорт. Телефон — чёрный Самсунг.',
        transcription: 'Аки́ тье́нэ ми пасапо́ртэ. Эль тэлэ́фоно эс ун Са́мсунг нэ́гро.',
      },
      {
        speakerId: 'person1',
        textEs: '¿Conoce el número IMEI del terminal para bloquearlo?',
        textRu: 'Вы знаете номер IMEI аппарата, чтобы заблокировать его?',
        transcription: '¿Коно́сэ эль ну́мэро имэ́и дэль тэрмина́ль па́ра блокэа́рло?',
      },
      {
        speakerId: 'person2',
        textEs: 'Sí, lo tengo anotado en este papel de la factura de compra.',
        textRu: 'Да, он записан у меня на этом листке с чеком о покупке.',
        transcription: 'Си, ло тэ́нго анота́до эн э́стэ папэ́ль дэ ла факту́ра дэ ко́мпра.',
      },
      {
        speakerId: 'person1',
        textEs: 'Le imprimo la copia firmada de la denuncia para su aseguradora y compañía telefónica.',
        textRu: 'Распечатываю подписанную копию заявления для вашей страховой и оператора связи.',
        transcription: 'Лэ импри́мо ла ко́пья фирма́да дэ ла дэну́нсья.',
      },
    ],
  },

  // 30. Аренда жилья: поломка крана и протечка
  {
    id: 'diag-30',
    titleRu: 'Бытовые проблемы: протечка воды хозяину',
    category: 'housing',
    situation: 'В съёмной квартире прорвало трубу под мойкой, вы срочно звоните хозяину.',
    roles: {
      person1: { nameRu: 'Хозяин квартиры', nameEs: 'Casero', roleRu: 'Арендодатель' },
      person2: { nameRu: 'Владимир (Жилец)', nameEs: 'Vladimir (Inquilino)', roleRu: 'Жилец' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Hola Carlos. Te llamo porque el flexo de agua debajo del fregadero se ha roto y gotea.',
        textRu: 'Привет, Карлос. Звоню, потому что гибкий шланг под мойкой лопнул и капает вода.',
        transcription: 'О́ла Ка́рлос. Тэ йя́мо поркэ́ эль фле́ксо дэ а́гуа дэба́хо дэль фрэгадэ́ро сэ а ро́то и готэ́а.',
      },
      {
        speakerId: 'person1',
        textEs: '¡Vaya! ¿Has cerrado la llave de paso general del agua?',
        textRu: 'Вот неприятность! Ты перекрыл главный вводной кран воды?',
        transcription: '¡Ва́йя! ¿Ас сэрра́до ла йя́вэ дэ па́со хэнэра́ль дэль а́гуа?',
      },
      {
        speakerId: 'person2',
        textEs: 'Sí, ya cerré la llave de paso y sequé el suelo con fregonas.',
        textRu: 'Да, я уже перекрыл кран и вытер пол шваброй.',
        transcription: 'Си, йя сэррэ́ ла йя́вэ дэ па́со и сэкэ́ эль суэ́ло кон фрэго́нас.',
      },
      {
        speakerId: 'person1',
        textEs: 'Menos mal. Llamo ahora mismo al fontanero del seguro para que vaya esta tarde.',
        textRu: 'Слава богу. Сейчас же вызываю сантехника по страховке, чтобы пришёл сегодня днём.',
        transcription: 'Мэ́нос маль. Йя́мо ао́ра ми́смо аль фонтанэ́ро дэль сэгу́ро.',
      },
      {
        speakerId: 'person2',
        textEs: 'De acuerdo, yo estaré en casa a partir de las cuatro.',
        textRu: 'Договорились, я буду дома начиная с четырёх часов.',
        transcription: 'Дэ акуэ́рдо, йё эстарэ́ эн ка́са а парти́р дэ лас куа́тро.',
      },
    ],
  },

  // 31. Покупка билета на поезд Renfe
  {
    id: 'diag-31',
    titleRu: 'Вокзал: покупка билета на скоростной поезд',
    category: 'city',
    situation: 'Покупка билета в кассе вокзала Аточа для поездки на собеседование в Валенсию.',
    roles: {
      person1: { nameRu: 'Кассир вокзала Renfe', nameEs: 'Taquillero', roleRu: 'Кассир' },
      person2: { nameRu: 'Владимир (Пассажир)', nameEs: 'Vladimir (Pasajero)', roleRu: 'Пассажир' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Buenos días. Un billete de ida y vuelta para Valencia para mañana en el primer tren.',
        textRu: 'Доброе утро. Билет туда и обратно в Валенсию на завтра на первый поезд.',
        transcription: 'Буэ́нос ди́ас. Ун бийе́тэ дэ и́да и вуэ́льта па́ра Валэ́нсья па́ра манья́на эн эль примэ́р трэн.',
      },
      {
        speakerId: 'person1',
        textEs: 'El AVE sale a las 7:10 y tarda una hora y cuarenta minutos. ¿Prefiere ventana o pasillo?',
        textRu: 'Скоростной поезд AVE отправляется в 7:10, время в пути 1:40. Предпочитаете у окна или у прохода?',
        transcription: 'Эль А́вэ са́лэ а лас сье́тэ и дьес.',
      },
      {
        speakerId: 'person2',
        textEs: 'En ventana, por favor. ¿Cuál es el precio total?',
        textRu: 'У окна, пожалуйста. Какова общая стоимость?',
        transcription: 'Эн вэнта́на, пор фаво́р. ¿Куа́ль эс эль прэ́сьо тота́ль?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sesenta y cuatro euros ida y vuelta. Puede pagar con tarjeta.',
        textRu: '64 евро туда и обратно. Можете оплатить картой.',
        transcription: 'Сэсэ́нта и куа́тро э́урос и́да и вуэ́льта.',
      },
    ],
  },

  // 32. Завтрак в испанском баре перед сменой
  {
    id: 'diag-32',
    titleRu: 'Испанский бар: традиционный завтрак',
    category: 'food',
    situation: 'Утренний перекус в кафе у цеха перед началом работы.',
    roles: {
      person1: { nameRu: 'Бармен', nameEs: 'Camarero', roleRu: 'Бармен' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Cliente)', roleRu: 'Посетитель' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: '¡Hola! ¿Qué te pongo para desayunar hoy?',
        textRu: 'Привет! Что тебе подать на завтрак сегодня?',
        transcription: '¡О́ла! ¿Кэ тэ по́нго па́ра дэсайюна́р ой?',
      },
      {
        speakerId: 'person2',
        textEs: 'Un café con leche en vaso y una tostada con tomate y aceite de oliva, por favor.',
        textRu: 'Кофе с молоком в стеклянном стакане и тост с протёртым томатом и оливковым маслом, пожалуйста.',
        transcription: 'Ун кафэ́ кон ле́чэ эн ва́со и у́на тоста́да кон тома́тэ и асэ́итэ дэ оли́ва.',
      },
      {
        speakerId: 'person1',
        textEs: '¿Pan blanco o integral? ¿Le añado jamón serrano a la tostada?',
        textRu: 'Белый хлеб или цельнозерновой? Добавить хамон серрано к тосту?',
        transcription: '¿Пан бла́нко о интэгра́ль? ¿Лэ анья́до хамо́н сэрра́но?',
      },
      {
        speakerId: 'person2',
        textEs: 'Pan blanco con jamón, por favor. Y un vaso de agua del grifo.',
        textRu: 'Белый хлеб с хамоном, пожалуйста. И стакан воды из-под крана.',
        transcription: 'Пан бла́нко кон хамо́н, пор фаво́р.',
      },
    ],
  },

  // 33. Вызов службы 112 при несчастном случае
  {
    id: 'diag-33',
    titleRu: 'Экстренный вызов 112: травма на производстве',
    category: 'welder',
    situation: 'Коллега получил травму от падения балки, срочный звонок в службу спасения.',
    roles: {
      person1: { nameRu: 'Оператор службы 112', nameEs: 'Operador del 112', roleRu: 'Оператор' },
      person2: { nameRu: 'Владимир (Свидетель)', nameEs: 'Vladimir (Testigo)', roleRu: 'Работник' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Emergencias 112, dígame, ¿cuál es la urgencia y en qué municipio?',
        textRu: 'Служба 112, слушаю вас. Какова срочность и в каком муниципалитете?',
        transcription: 'Эмэрхэ́нсьяс у́но у́но дос, ди́гамэ, ¿куа́ль эс ла ургэ́нсья?',
      },
      {
        speakerId: 'person2',
        textEs: 'Un accidente laboral en San Fernando de Henares, calle del Metal 12. Ha caído una viga.',
        textRu: 'Производственная травма в Сан-Фернандо-де-Энарес, улица Метал 12. Упала балка.',
        transcription: 'Ун аксидэ́нтэ лабора́ль эн Сан Фэрна́ндо дэ Эна́рэс. А каи́до у́на ви́га.',
      },
      {
        speakerId: 'person1',
        textEs: '¿La persona está consciente? ¿Tiene hemorragia?',
        textRu: 'Пострадавший в сознании? Есть кровотечение?',
        transcription: '¿Ла пэрсо́на эста́ консье́нтэ? ¿Тье́нэ эморра́хья?',
      },
      {
        speakerId: 'person2',
        textEs: 'Está consciente pero tiene una pierna atrapada. Manden ambulancia y bomberos, por favor.',
        textRu: 'В сознании, но нога зажата. Пришлите скорую и спасателей, пожалуйста.',
        transcription: 'Эста́ консье́нтэ пэ́ро тье́нэ у́на пье́рна атрапа́да.',
      },
      {
        speakerId: 'person1',
        textEs: 'Los equipos de emergencia ya están en camino. No mueva al herido.',
        textRu: 'Бригады экстренных служб уже выехали. Не перемещайте пострадавшего.',
        transcription: 'Лос эки́пос дэ эмэрхэ́нсья йя эста́н эн ками́но.',
      },
    ],
  },

  // 34. Покупка спецодежды сварщика в магазине Proind
  {
    id: 'diag-34',
    titleRu: 'Магазин спецодежды: рабочая обувь и маска',
    category: 'welder',
    situation: 'Покупка профессиональных ботинок с защитным подноском и автоматической маски.',
    roles: {
      person1: { nameRu: 'Продавец магазина СИЗ', nameEs: 'Vendedor técnico', roleRu: 'Продавец' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person2',
        textEs: 'Hola. Busco botas de seguridad homologadas S3 con puntera metálica en talla 43.',
        textRu: 'Здравствуйте. Ищу сертифицированные ботинки S3 со стальным носком, 43 размер.',
        transcription: 'О́ла. Бу́ско бо́тас дэ сэгурида́д омолога́дас э́сэ трэс.',
      },
      {
        speakerId: 'person1',
        textEs: 'Pruébese estas con suela antiperforación y piel hidrófuga ignífuga especial para soldadura.',
        textRu: 'Померяйте эти: с антипрокольной стелькой и огнестойкой кожей специально для сварки.',
        transcription: 'Пруэ́бэсэ э́стас кон суэ́ла антипэрфорасьо́н.',
      },
      {
        speakerId: 'person2',
        textEs: 'Me quedan perfectas y son muy cómodas. ¿Tiene también pantallas de soldar electrónicas?',
        textRu: 'Сидят идеально и очень удобные. Есть ли также электронные маски сварщика?',
        transcription: 'Мэ кэ́дан пэрфэ́ктас. ¿Тье́нэ тамбье́н панта́йяс дэ сольда́р элэктро́никас?',
      },
      {
        speakerId: 'person1',
        textEs: 'Sí, tenemos este modelo con cuatro sensores y ajuste DIN de 9 a 13.',
        textRu: 'Да, вот модель с четырьмя датчиками и регулировкой затемнения от 9 до 13 DIN.',
        transcription: 'Си, тэнэ́мос э́стэ модэ́ло кон куа́тро сэнсо́рэс.',
      },
      {
        speakerId: 'person2',
        textEs: 'Me llevo las botas y la pantalla. Emítame factura con mi NIE, por favor.',
        textRu: 'Беру ботинки и маску. Оформите мне фактуру с указанием моего NIE, пожалуйста.',
        transcription: 'Мэ йе́во лас бо́тас и ла панта́йя. Эми́тамэ факту́ра кон ми ни́э.',
      },
    ],
  },

  // 35. Контроль качества шва: рентген и ультразвук
  {
    id: 'diag-35',
    titleRu: 'Контроль качества: дефектоскопия и рентген шва',
    category: 'welder',
    situation: 'Инженер по неразрушающему контролю проверяет качество сварного стыка трубы.',
    roles: {
      person1: { nameRu: 'Инженер контроля качества', nameEs: 'Inspector de Calidad', roleRu: 'Инженер' },
      person2: { nameRu: 'Владимир (Сварщик)', nameEs: 'Vladimir (Soldador)', roleRu: 'Сварщик' },
    },
    turns: [
      {
        speakerId: 'person1',
        textEs: 'Vladimir, vamos a hacer el control por ultrasonidos en la tubería de gas que has soldado.',
        textRu: 'Владимир, сейчас проведём ультразвуковой контроль на газовой трубе, которую ты варил.',
        transcription: 'Алэксэ́й, ва́мос а асэ́р эль контро́ль пор ультрасони́дос эн ла тубэри́а.',
      },
      {
        speakerId: 'person2',
        textEs: 'De acuerdo. Dejé la superficie bien limpia y desbastada sin rebabas.',
        textRu: 'Хорошо. Я оставил поверхность чисто зачищенной, без заусенцев и наплывов.',
        transcription: 'Дэ акуэ́рдо. Дэ́хэ ла супэрфи́сье бьен ли́мпья и дэсбаста́да.',
      },
      {
        speakerId: 'person1',
        textEs: 'La gráfica del ecógrafo no muestra ninguna fisura, inclusión de escoria ni falta de fusión.',
        textRu: 'График дефектоскопа не показывает трещин, шлаковых включений или несплавлений.',
        transcription: 'Ла гра́фика дэль эко́графо но муэ́стра нингу́на фису́ра.',
      },
      {
        speakerId: 'person2',
        textEs: 'Excelente. Puse mucho esmero en la penetración de la raíz con TIG.',
        textRu: 'Отлично. Я уделил особое внимание провару корня шва аргоном.',
        transcription: 'Эксэле́нтэ. Пу́сэ му́чо эсмэ́ро эн ла пэнэтрасьо́н дэ ла раи́с кон Тиг.',
      },
      {
        speakerId: 'person1',
        textEs: 'Firma la hoja del ensayo no destructivo. Buen trabajo, soldadura homologada.',
        textRu: 'Распишись в акте неразрушающего контроля. Отличная работа, шов прошёл аттестацию.',
        transcription: 'Фи́рма ла о́ха дэль энса́ййо но дэструкти́во. Буэн траба́хо.',
      },
    ],
  },
];

