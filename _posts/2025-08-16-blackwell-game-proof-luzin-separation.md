---
layout: post
title: Blackwell's Game-Theoretic Proof of Analytic Separation
date: 2025-08-16
description: Rewriting Blackwell's original argument in terms of trees
tags: descriptive-set-theory games
related_posts: false
---

Recently I've had the occasion to revisit Blackwell's celebrated alternative proof[^1] of the (Suslin-Luzin) [Analytic Separation Theorem](https://en.wikipedia.org/wiki/Lusin%27s_separation_theorem):

>**Theorem.** Let $A, B\subseteq{}^\omega\omega$ be disjoint analytic ($\mathbf{\Sigma}^1_1$) sets, then there are disjoint analytic sets $A'\supseteq A, B'\supseteq B$ such that $A'\cup B' = {}^\omega\omega$.

[^1]: Blackwell, D., 1967. Infinite games and analytic sets. Proceedings of the National Academy of Sciences, 58(5), pp.1836-1837. [Link to paper.](https://www.pnas.org/doi/10.1073/pnas.58.5.1836)

Note that $A'$ will be Borel by virtue of having the analytic completement $B'$. In fact, the theorem is usually stated in terms of the existence of such a Borel $A'$, but it is stated here in terms of analytic $A'$ and $B'$ because it brings the moving pieces of the proof closer to the surface.

The key insight from the proof is to represent analytic sets via ill-founded trees. Recall that $X$ is analytic iff there is an assignment of trees $z\mapsto T(z)$ such that $z\in X$ iff $T(z)$ is has an infinite branch. For more on this see my note [Normal forms for analytic sets, Luzin's arithmetic example, and prewellorderings](/notes/Nov_22_2022_Sigma11_normal_form_norms_prewellorderings.pdf). 

So say $A$ is represented by $z\mapsto T(z)$ and $B$ by $z\mapsto U(z)$. This gives us a way, given $z\in {}^\omega\omega$, to play the tree-climbing game $G^z$. More specifically, players $I$ and $II$ take turn playing natural numbers

$$
\begin{array}{ccccccc}
I: & a(1) &~  & a(2) & ~ & a(3) &...\\
II: & ~ &  b(1) & ~ & b(2) & ~ & b(3)& ...\\
\end{array}
$$

$I$ wins if there is some turn $n\in\omega$ where $\langle a(1),...,a(n)\rangle\in T(z)$ but $\langle b(1),...,b(n)\rangle\notin U(z)$. $II$ wins if there is some turn $n\in\omega$ where $\langle b(1),...,b(n)\rangle\in U(z)$ but $\langle a(1),...,a(n)\rangle\notin T(z)$.

Simply put, each player tries to outlast the other by staying on their respective tree for as long as possible. If $z\in A$, when $I$ has a winning strategy by just following an infinite branch in $T(z)$ that witnesses this; simiarly for $II$ if $z\in B$. Another crucial observation is that the outcome of the game is decided after finitely many moves, making the game an open game, which means one of the players must have a winning strategy by the Gale-Stewart theorem.

The preceiding discussion suggests that we consider

$A':=\\{ z\in{}^\omega\omega\mid I \text{ has a winning strategy in } G^z\\}$

and

$B':=\\{ z\in{}^\omega\omega\mid II \text{ has a winning strategy in } G^z\\}$

Then these two are the sets that we want. QED (Quick & Easy Determinacy?)


The above proof stays pretty close to Blackwell's original, except I've assumed that $A$ and $B$ are disjoint (which is how the separation theorem is usually stated anyways), in order to get rid of the possibility of a draw. The other bit of change is to talk about analytic sets in terms of trees rather than continuous functions. This reads much more naturally, at least for someone like me who was inducted into the business via infinite branch talk.

The same idea also works to prove the reduction principle for coanalytic sets, from which analytic separation follows by simple propositional logic:

>**Theorem.** Let $A, B\subseteq{}^\omega\omega$ be conalytic ($\mathbf{\Pi}^1_1$) sets, then there are disjoint coanalytic sets $A'\subseteq A, B'\subseteq B$ such that $A'\cup B' = A\cup B$.

The game-theoretic proof of this can be found in Theorem 29.5 in Kanamori's *The Higher Infinite*.

A fun tidbit in closing: you can find an interview with David Blackwell, in which he briefly talks about this proof (among many other things), in the book *Mathematical People: Profiles and Interviews* by Albers and Alexanderson.
