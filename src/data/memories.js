// Central data file — keeps content separate from presentation.
// Image paths are placeholders. Drop real files into /public/images
// using these exact names and they will appear automatically.
// If a file is missing, components fall back to a gradient treatment.


export const images = {
  hero: "/images/hero.png",
  school: "/images/school.png",
  hospital: "/images/hospital.png",
  train: "/images/train.png",
  city: "/images/city.png",
  sky: "/images/sky.png",
  fireworks: "/images/fireworks.png",
  sunset: "/images/sunset.png",
};

export const timeline = [
  {
    id: "diary",
    number: "01",
    date: "Early Spring",
    title: "The Diary",
    description:
      "A book left open on a waiting-room bench. A name that should not have been read, and could not be forgotten.",
    detail:
      "Some things find us by accident and quietly change everything. What began with a stranger's careless glance became the first thread between two people who had little in common, except for a truth they now shared.",
  },

  {
    id: "secret",
    number: "02",
    date: "Late Spring",
    title: "The Secret",
    description:
      "A promise to say nothing, kept between two people who barely knew each other's names.",
    detail:
      "Secrets have a strange gravity. Once someone trusts you with one, the distance between two people begins to disappear, even when neither person says it out loud.",
  },

  {
    id: "hospital",
    number: "03",
    date: "Early Summer",
    title: "The Hospital",
    description:
      "White corridors, quiet rooms, and ordinary conversations in an extraordinary chapter of life.",
    detail:
      "Not every important conversation needs a beautiful setting. Some of the truest moments happen beneath fluorescent lights, between appointments, inside the smallest pockets of time.",
  },

  {
    id: "journey",
    number: "04",
    date: "Midsummer",
    title: "The Journey",
    description:
      "A trip taken without a perfect reason, except for the feeling that the moment might never come again.",
    detail:
      "They went somewhere ordinary and somehow made it unforgettable. Sometimes a place becomes special simply because of who stood beside us when we were there.",
  },

  {
    id: "fireworks",
    number: "05",
    date: "Midsummer",
    title: "The Fireworks",
    description:
      "A sky that lit up for only a few seconds, yet remained bright in memory for years.",
    detail:
      "Some moments are meant to be brief. Their shortness does not make them less meaningful. Sometimes it is precisely because they cannot last that we hold them so tightly.",
  },

  {
    id: "summer",
    number: "06",
    date: "Late Summer",
    title: "The Summer",
    description:
      "A season that felt endless while it lasted, and impossibly short once it was gone.",
    detail:
      "We rarely know which ordinary season will become precious to us later. We only understand its value after it has become a memory.",
  },

  {
    id: "letter",
    number: "07",
    date: "After",
    title: "The Letter",
    description:
      "Words written for a day that seemed impossible, yet eventually found their way into waiting hands.",
    detail:
      "A letter can become a bridge between moments that can no longer meet. Long after the writer is gone, the words can still carry something of their voice.",
  },

  {
    id: "memory",
    number: "08",
    date: "Always",
    title: "The Memory",
    description:
      "What remains when the story ends: not simply an ending, but a different way of living.",
    detail:
      "The people who change us do not have to remain beside us forever. What they taught us, what they awakened in us, and how they changed the way we see life can remain.",
  },
];

export const diaryEntries = [
  {
    id: 1,
    rotation: -3,
    text: "Today was an ordinary day.",
    body:
      "Nothing happened that seemed worth writing down. And yet I wrote it down anyway. Maybe the ordinary days are the ones we miss the most once they become memories.",
  },

  {
    id: 2,
    rotation: 2,
    text: "I wonder how many ordinary days we take for granted.",
    body:
      "We often save our attention for the big moments and allow the small ones to disappear unnoticed. But perhaps the small moments are what make a life feel complete.",
  },

  {
    id: 3,
    rotation: -2,
    text: "Maybe every day deserves to be lived fully.",
    body:
      "Not because every day is extraordinary. Most days are wonderfully ordinary. But each one arrives only once, and that alone makes it worth noticing.",
  },

  {
    id: 4,
    rotation: 3,
    text: "He asked me the strangest questions today.",
    body:
      "They were the kind of questions people usually keep hidden. Somehow, answering them felt easier than expected. Maybe honesty becomes less frightening when someone is willing to listen.",
  },

  {
    id: 5,
    rotation: -1,
    text: "I don't want to be remembered by one part of my story.",
    body:
      "I want to be remembered for the laughter, the conversations, the silly moments, the quiet afternoons, and all the ordinary pieces that made me who I was.",
  },

  {
    id: 6,
    rotation: 1,
    text: "Some friendships aren't measured in years.",
    body:
      "Perhaps they are measured by how much of ourselves we allow another person to see. By that measure, even a short friendship can become something deeply meaningful.",
  },
];

export const places = [
  {
    id: "school",
    title: "The School",
    image: images.school,
    description:
      "Quiet hallways where two people who once passed each other unnoticed finally found a reason to speak.",
  },

  {
    id: "hospital",
    title: "The Hospital",
    image: images.hospital,
    description:
      "A place associated with uncertainty that unexpectedly became the setting for meaningful conversations and unforgettable moments.",
  },

  {
    id: "train",
    title: "The Train",
    image: images.train,
    description:
      "A journey shared between two people, turning an ordinary ride into something worth remembering.",
  },

  {
    id: "city",
    title: "The City",
    image: images.city,
    description:
      "Familiar streets that somehow looked different after being experienced through new memories.",
  },

  {
    id: "sky",
    title: "The Summer Sky",
    image: images.sky,
    description:
      "A vast sky holding all the words left unsaid and all the moments that did not need words.",
  },

  {
    id: "fireworks",
    title: "The Fireworks",
    image: images.fireworks,
    description:
      "A few seconds of light that became one of those memories capable of lasting much longer than the moment itself.",
  },
];

export const memoryBoxFragments = [
  "A summer afternoon.",
  "A train ride home.",
  "A conversation that changed everything.",
  "A letter left behind.",
  "A name discovered by accident.",
  "A promise kept quietly.",
];

export const letters = [
  {
    id: "live",
    to: "To the person who taught me to live.",
    body:
      "I don't think you ever realized how much those ordinary afternoons meant. You were not trying to teach me anything. You were simply living honestly, in whatever time you had, and somehow that became the lesson. I am still learning it.",
  },

  {
    id: "summer",
    to: "To the summer I will never forget.",
    body:
      "You felt endless while I was living through you, yet somehow disappeared before I was ready. I used to measure seasons by how quickly they passed. Now I measure them by the memories they leave behind.",
  },

  {
    id: "memories",
    to: "To the memories that stayed.",
    body:
      "So many details eventually fade: the weather, the ordinary routines, the little things that once seemed important. But some memories remain clear. Perhaps those are the moments that mattered most.",
  },
];

export const themes = [
  {
    word: "LIVE",
    text:
      "Life feels precious because every moment is temporary. That is not something to fear, but something to appreciate.",
  },

  {
    word: "CHOICE",
    text:
      "Every ordinary day gives us another opportunity to choose how we spend our time and who we choose to share it with.",
  },

  {
    word: "CONNECTION",
    text:
      "Sometimes meeting one person can change the way we understand ourselves, other people, and the world around us.",
  },

  {
    word: "MEMORY",
    text:
      "People may leave our lives, but the moments we shared and the changes they made within us can continue long after.",
  },
];

