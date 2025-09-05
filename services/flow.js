// Added a `delay` property in milliseconds to each step.
// The frontend will use this to disable the "Next" button for a set time.
// Delays are estimates: text ~5s, images ~10s, audio/video ~ a few minutes.
const flow = {
  0: {
    text: `__**Working the 12 Steps with Roy T.**__\n\n**Introduction**\n\nHi ! My name is Roy T. and I am a recovered alcoholic and addict.\nThank you for asking me to share my step experience with you.\nPlease note the word 'sponsor' is not in the first 164 pages of the AA basic text so I can't be your Sponsor 😊\n\nThe authors use the terms:\n● 'spiritual advisor' (pg63),\n● 'close mouthed friend' (pg74),\n● and 'practical advisor' (pg96).\n\nSo I will be happy to be your Practical Advisor (PA) Spiritual Guide (SG) and Close Mouthed Friend (CMF) 😁\n\nAlternatively you can find many NONSORS in AA 😂`,
    continuePrompt: `Click "Next" to continue`,
    delay: 10000, // 10 seconds for long text
    nextStep: 1,
  },
  1: {
    images: ["/public/images/Sponsor1.jpeg"],
    continuePrompt: `Click "Next" to continue`,
    delay: 5000,
    nextStep: 2,
  },
  2: {
    images: ["/public/images/nonsor.jpeg"],
    continuePrompt: `Click "Next" to continue`,
    delay: 5000,
    nextStep: 3,
  },
  3: {
    text: `📖 **WHY TAKE THE TWELVE STEPS?**\n**(ADAPTED FROM THE DOCTORS OPINION chapter of the AA Big Book)**\n\n🌀 Men and women take the Twelve Steps essentially because they like the effect produced by them.\n\n🧠 The sensation is not so elusive that they admit it is helpful, and realize after a time that they can differentiate the true from the false.\n\n🌱 To them, their recovered alcoholic life seems the only normal one.\n\n😟 If they stop taking the Steps, as so many do, they become restless, irritable, and discontented, unless they can again experience the sense of ease and comfort which comes at once by taking a few Steps--Steps they see others taking with success.\n\n🔁 After they have succumbed to the desire to work the Steps again, and they pass through the well-known stages of recovery, emerging happy, with a firm resolution not to let their program slip away again.\n\n🔄 This is repeated over and over, and as this person experiences an entire psychic change, there is every hope of his recovery.`,
    continuePrompt: `Click "Next" to continue`,
    delay: 15000, // 15 seconds
    nextStep: 4,
  },
   4: {
    images: ["/public/images/Step_0_2.jpeg"],
    continuePrompt: `Click "Next" to continue`,
    delay: 5000,
    nextStep: 5,
  },
  5: {
    images: ["/public/images/Step_0_3.jpeg"],
    continuePrompt: `Click "Next" to continue`,
    delay: 5000,
    nextStep: 6,
  },
  6: {
    text: `1️⃣ You will need an Alcoholics Anonymous Big Book (preferably full size 578 pages blue/yellow hardcover).\n\n2️⃣ Please open to page 58, 2nd paragraph and make this decision : “If you have decided you want what we have and are willing to go to any length to get it, then you are ready to take certain steps”\n\n3️⃣ If you have made the decision, please write on the 1st page of your book "I, ______, have decided that I want what you have and am willing to go to any length to get it."\n\n4️⃣ Then please sign your name, write your sober date and get ready.\n\n🙏 Thank you.`,
    images: ["/public/images/book1.jpeg", "/public/images/book2.jpeg"],
    continuePrompt: `Click "Next" to continue`,
    delay: 15000,
    nextStep: 7,
  },
  7: {
    text: `Thank you for making the decision ☺.\n\nNow I will send you 2 old sharing's of mine for you to listen to before we start the step study.\n\nPlease continue after listening to the shares!`,
    attachments: [
        { type: 'audio', url: '/public/audio/Slogans.mp3', caption: 'Roy T.. Primary Purpose Group, Long Island NY 2013' }
    ],
    continuePrompt: `Click "Next" to continue`,
    delay: 60000 * 5, // 5 minutes
    nextStep: 8,
  },
  8: {
    attachments: [
        { type: 'audio', url: '/public/audio/aas_roys_story.mp3', caption: 'Roy T - Lincoln Nebraska 2016' }
    ],
    continuePrompt: `Click "Next" to continue`,
    delay: 60000 * 10, // 10 minutes
    nextStep: 9,
  },
  9: {
    text: `Thanks for listening to the shares.\nBefore we begin, I recommend watching the following 2 movies which are posted next in this folder:\n\n**“My Name is Bill W.”**`,
    images: ["/public/images/movie1.jpeg"],
    continuePrompt: `Click "Next" to continue`,
    delay: 10000,
    nextStep: 10,
  },
  10: {
    attachments: [
      { type: 'video', url: '/public/movies/movie1.mp4', caption: 'Watch "My Name is Bill W."' }
    ],
    continuePrompt: `Click "Next" to continue`,
    delay: 60000 * 30, // 30 minutes
    nextStep: 11,
  },
  11: {
    text: `**"When Love Is Not Enough"** - The Lois Wilson Story (Bill W's wife)`,
    images: ["/public/images/movie2.jpeg"],
    continuePrompt: `Click "Next" to continue`,
    delay: 10000,
    nextStep: 12,
  },
  12: {
    attachments: [
      { type: 'video', url: '/public/movies/movie2.mp4', caption: 'Watch "When Love Is Not Enough"' }
    ],
    continuePrompt: `Click "Next" to continue`,
    delay: 60000 * 30, // 30 minutes
    nextStep: 13,
  },
  13: {
    text: `Thanks for watching the movies-\n\nNow its time to begin the Steps!!!\n\nTHE STEPWALK BEGINS HERE 🙏`,
    images: ["/public/images/Sponsor.jpeg"],
    continuePrompt: `Click "Next" to continue`,
    delay: 10000,
    nextStep: 14,
  },
  14: {
    images: ["/public/images/road.jpeg"],
    continuePrompt: `Click "Next" to continue`,
    delay: 5000,
    nextStep: 15,
  },
  15: {
    text: `Here are the Pre-Step 1 **“suggestions”**\n\n1. Please read FROM page 0 (the 1st blank page of the big book where your decision signature is ), the title page, the preface, all the forewords 1 2 3 4, the doctors opinion and UPTO pg 16 (the end of Bills Story) -- please underline or highlight any words or sentences that you identified with\n\n2. Listen to my sharing on the History\n\n3. View the History summary PDF (Some people have told me that they found it helpful to print the PDF)\n\n4. Listen to A Deep Dive Review - From Ancient Alcoholism to AA and Recovery`,
    continuePrompt: `Click "Next" to continue`,
    delay: 20000,
    nextStep: 16,
  },
  16: {
    attachments: [
        { type: 'audio', url: '/public/audio/History.mp3', caption: 'Listen to History Sharing' }
    ],
    continuePrompt: `Click "Next" to continue`,
    delay: 60000 * 15, // 15 minutes
    nextStep: 17,
  },
  17: {
    text: `Here is the History summary for you to review.`,
    attachments: [
      { type: 'pdf', url: '/public/files/summary.pdf', caption: 'View History Summary (PDF)' },
    ],
    continuePrompt: `Click "Next" to continue`,
    delay: 60000 * 5, // 5 minutes
    nextStep: 18,
  },
  18: {
    attachments: [
        { type: 'audio', url: '/public/audio/Deep.mp3', caption: 'Listen to A Deep Dive Review' }
    ],
    continuePrompt: `Click "Next" to continue`,
    delay: 60000 * 15, // 15 minutes
    nextStep: 19,
    awaitsUserInput: true,
  },
  19: {
    text: `You have completed the pre-step work. Please message me when you are ready to discuss.`,
    awaitsUserInput: true,
    nextStep: null, // End of the automated flow
  }
};

module.exports = { flow };