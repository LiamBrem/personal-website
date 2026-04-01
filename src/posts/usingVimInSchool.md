---
title: Why You Should Use Vim For Every One of Your School Assignments
date: 2026-03-31
description: How vim will make you smarter
---
**TL;DR:** There are more reasons to use Vim other than flexing on all of your friends/coworkers. It can genuinely make you a better engineer. 

While many people see Vim as outdated, it's actually one of the most useful tools I have grown fond for while in college. But, let's first take a step back:

As a teaching assistant helping students with programming assignments, I've seen some crazy things. For example, one student's Java code wasn't compiling correctly in their IDE. After suggesting they compile and run it through the command line for simplicity (it was like 2 Java files), they then proceeded to go to their file explorer, and manually copy all of the files into another folder, cd into that folder, and run it like this:

```bash
javac *.java
javac -Xlint *.java
java Main
```

Yes, you're seeing that correctly; they compiled it twice. 

After making some changes to their code, they would repeat the above process every single time. 

I'm certainly not trying to poke fun at this student. In fact, I think they're just an example for the broader issue we're seeing with CS students; too many people just don't understand how things work! Most CS curriculums and courses are optimized to get students from point A to point B without allowing time or motivating students to explore what's actually going on under the hood.

Furthermore, it isn't entirely the school's fault, either. A DSA course doesn't really have the time to explain the difference between a compiled and interpreted language, different language features, etc. So, in that essence, it is on the student. We're also seeing a case of more and more students becoming less curious about how things work and only using the computer science degree as a means to an end. The whole purpose of being a SWE is understanding how things work at the level below you so you can take advantage of it and build more things.

By using an editor like Vim, you, as a student, will be forced to understand a lot of goes on as a side effect. Here are the 3 main reasons you should consider using it:

1. Most importantly: Vim is very barebones. It forces you to do everything that an IDE would do for you, manually. Much of what goes on in an IDE becomes abstracted away from you, so you don't really ever have an idea of what's going on
2. Customization: When I mention Vim, I'm mainly talking about [NeoVim](https://neovim.io/). You don't have to know the difference right now, but NeoVim is basically modern Vim. What NeoVim allows you to do is customize the entire program to your liking, making it tailored exactly to your use. 
3. [Vim Motions](https://www.barbarianmeetscoding.com/boost-your-coding-fu-with-vscode-and-vim/moving-blazingly-fast-with-the-core-vim-motions/): Vim prevents you from using the mouse, so you will inevitably become a faster programmer by learning Vim Motions. 



It's also great to explore other IDEs and understand what each one offers. I just think there's so much to gain from using Vim, especially while in school.

> Check out my current setup [here](https://github.com/LiamBrem/nvim-setup)