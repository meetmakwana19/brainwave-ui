export const sample = [
  {
    type: "doc",
    uid: 12345,
    children: [
      {
        type: "h1",
        uid: "<unique_id>",
        attrs: { style: {}, "redactor-attributes": {}, dir: "ltr" },
        children: [
          {
            text: "Brainstormed Ideas",
            bold: true,
          },
        ],
      },
      {
        type: "p",
        uid: "<unique_id>",
        attrs: { style: {}, "redactor-attributes": {}, dir: "ltr" },
        children: [
          {
            text: "Idea 1: Highlight the importance of scalability in software development.",
          },
        ],
      },
      {
        type: "ul",
        uid: "<unique_id>",
        children: [
          {
            type: "li",
            uid: "<unique_id>",
            attrs: { style: {}, "redactor-attributes": {}, dir: "ltr" },
            children: [
              {
                text: "Discuss the role of cloud computing in achieving scalability.",
              },
            ],
          },
          {
            type: "li",
            uid: "<unique_id>",
            attrs: { style: {}, "redactor-attributes": {}, dir: "ltr" },
            children: [
              {
                text: "Explain how containerization can improve application scalability.",
              },
            ],
          },
        ],
      },
    ],
  },
];
