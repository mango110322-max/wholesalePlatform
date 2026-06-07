const C = {
  ink: "#14213D",
  muted: "#5F6B7A",
  bg: "#F7F9FC",
  panel: "#FFFFFF",
  line: "#CBD5E1",
  work: "#2F80ED",
  index: "#00A86B",
  repo: "#7C3AED",
  remote: "#E67E22",
  dark: "#0F172A",
  softBlue: "#EAF3FF",
  softGreen: "#E8F7EF",
  softViolet: "#F1EAFE",
  softOrange: "#FFF2E3",
  red: "#D7263D",
};

function addText(slide, ctx, opts) {
  return ctx.addText(slide, {
    typeface: opts.face || ctx.fonts.body,
    insets: opts.insets || { left: 10, right: 10, top: 6, bottom: 6 },
    ...opts,
  });
}

function addBox(slide, ctx, { x, y, w, h, title, subtitle, fill, stroke, accent }) {
  ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    geometry: "roundRect",
    fill,
    line: ctx.line(stroke, 2),
  });
  ctx.addShape(slide, {
    x,
    y,
    w: 8,
    h,
    geometry: "rect",
    fill: accent,
    line: ctx.line(accent, 0),
  });
  addText(slide, ctx, {
    text: title,
    x: x + 24,
    y: y + 20,
    w: w - 48,
    h: 32,
    fontSize: 22,
    bold: true,
    color: C.ink,
    face: ctx.fonts.title,
  });
  addText(slide, ctx, {
    text: subtitle,
    x: x + 24,
    y: y + 60,
    w: w - 48,
    h: 78,
    fontSize: 15,
    color: C.muted,
  });
}

function arrow(slide, ctx, { x, y, label, color, direction = "right", w = 48, labelY }) {
  ctx.addShape(slide, {
    x,
    y,
    w,
    h: 24,
    geometry: direction === "left" ? "leftArrow" : "rightArrow",
    fill: color,
    line: ctx.line(color, 0),
  });
  if (label) {
    addText(slide, ctx, {
      text: label,
      x: x - 30,
      y: labelY ?? y - 28,
      w: w + 60,
      h: 24,
      fontSize: 12,
      color: C.muted,
      align: "center",
      face: ctx.fonts.mono,
    });
  }
}

function pill(slide, ctx, { x, y, w, text, color, fill }) {
  ctx.addShape(slide, {
    x,
    y,
    w,
    h: 31,
    geometry: "roundRect",
    fill,
    line: ctx.line(color, 1.2),
  });
  addText(slide, ctx, {
    text,
    x,
    y: y + 1,
    w,
    h: 28,
    fontSize: 14,
    bold: true,
    color,
    align: "center",
    face: ctx.fonts.mono,
  });
}

function smallNode(slide, ctx, { x, y, text, color }) {
  ctx.addShape(slide, {
    x,
    y,
    w: 116,
    h: 44,
    geometry: "roundRect",
    fill: "#FFFFFF",
    line: ctx.line(color, 1.5),
  });
  addText(slide, ctx, {
    text,
    x: x + 8,
    y: y + 7,
    w: 100,
    h: 26,
    fontSize: 13,
    bold: true,
    color,
    align: "center",
    face: ctx.fonts.mono,
  });
}

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;

  addText(slide, ctx, {
    text: "Git 概念模型",
    x: 62,
    y: 38,
    w: 430,
    h: 48,
    fontSize: 34,
    bold: true,
    color: C.dark,
    face: ctx.fonts.title,
  });
  addText(slide, ctx, {
    text: "文件状态在四个区域之间流动；分支和 HEAD 只是指向提交对象的引用。",
    x: 65,
    y: 88,
    w: 760,
    h: 30,
    fontSize: 17,
    color: C.muted,
  });

  const boxes = [
    {
      x: 60,
      y: 206,
      w: 240,
      h: 148,
      title: "工作区",
      subtitle: "Working Tree\n当前目录中的真实文件\n包含未跟踪和已修改内容",
      fill: C.softBlue,
      stroke: "#9CC7FF",
      accent: C.work,
    },
    {
      x: 350,
      y: 206,
      w: 240,
      h: 148,
      title: "暂存区",
      subtitle: "Index / Stage\n下一次 commit 将记录的\n快照清单",
      fill: C.softGreen,
      stroke: "#8BD7AE",
      accent: C.index,
    },
    {
      x: 640,
      y: 206,
      w: 240,
      h: 148,
      title: "本地仓库",
      subtitle: "Local Repository\n提交对象、树对象\n以及本地分支引用",
      fill: C.softViolet,
      stroke: "#C7B2F4",
      accent: C.repo,
    },
    {
      x: 930,
      y: 206,
      w: 240,
      h: 148,
      title: "远程仓库",
      subtitle: "Remote Repository\n团队共享的提交图\n和远程分支引用",
      fill: C.softOrange,
      stroke: "#F5C891",
      accent: C.remote,
    },
  ];

  for (const box of boxes) addBox(slide, ctx, box);

  arrow(slide, ctx, { x: 310, y: 266, label: "git add", color: C.index, w: 34, labelY: 178 });
  arrow(slide, ctx, { x: 600, y: 266, label: "git commit", color: C.repo, w: 34, labelY: 178 });
  arrow(slide, ctx, { x: 890, y: 266, label: "git push", color: C.remote, w: 34, labelY: 178 });

  arrow(slide, ctx, { x: 892, y: 324, color: C.work, direction: "left", w: 34 });
  addText(slide, ctx, {
    text: "git fetch / pull",
    x: 828,
    y: 358,
    w: 170,
    h: 22,
    fontSize: 13,
    color: C.muted,
    align: "center",
    face: ctx.fonts.mono,
  });

  addText(slide, ctx, {
    text: "git checkout / restore",
    x: 130,
    y: 372,
    w: 210,
    h: 24,
    fontSize: 13,
    color: C.muted,
    align: "center",
    face: ctx.fonts.mono,
  });
  arrow(slide, ctx, { x: 312, y: 324, color: C.work, direction: "left", w: 34 });

  ctx.addShape(slide, {
    x: 88,
    y: 452,
    w: 1104,
    h: 142,
    geometry: "roundRect",
    fill: "#FFFFFF",
    line: ctx.line("#DDE5EE", 1.4),
  });
  addText(slide, ctx, {
    text: "提交图与引用",
    x: 118,
    y: 472,
    w: 150,
    h: 28,
    fontSize: 19,
    bold: true,
    color: C.dark,
    face: ctx.fonts.title,
  });

  smallNode(slide, ctx, { x: 420, y: 508, text: "commit A", color: C.repo });
  smallNode(slide, ctx, { x: 585, y: 508, text: "commit B", color: C.repo });
  smallNode(slide, ctx, { x: 750, y: 508, text: "commit C", color: C.repo });
  arrow(slide, ctx, { x: 538, y: 518, color: C.repo, w: 38 });
  arrow(slide, ctx, { x: 703, y: 518, color: C.repo, w: 38 });

  pill(slide, ctx, { x: 747, y: 458, w: 122, text: "main", color: C.repo, fill: "#F5F0FF" });
  pill(slide, ctx, { x: 910, y: 508, w: 118, text: "HEAD", color: C.red, fill: "#FFF1F3" });
  addText(slide, ctx, {
    text: "HEAD -> main",
    x: 899,
    y: 548,
    w: 140,
    h: 22,
    fontSize: 14,
    bold: true,
    color: C.red,
    align: "center",
    face: ctx.fonts.mono,
  });
  addText(slide, ctx, {
    text: "分支名保存的是“某个提交”的位置；切换分支就是移动 HEAD 指向。",
    x: 118,
    y: 524,
    w: 252,
    h: 58,
    fontSize: 14,
    color: C.muted,
  });

  addText(slide, ctx, {
    text: "核心心智模型：Git 管理的是快照和指针，不是简单的文件差异流水账。",
    x: 70,
    y: 642,
    w: 780,
    h: 30,
    fontSize: 18,
    bold: true,
    color: C.ink,
  });
  addText(slide, ctx, {
    text: "常用查看：git status / git log --oneline --graph / git diff --staged",
    x: 762,
    y: 642,
    w: 430,
    h: 30,
    fontSize: 14,
    color: C.muted,
    align: "right",
    face: ctx.fonts.mono,
  });

  return slide;
}
