---
layout: post
title:  Silly proof of nonisomorphic uncountable linear orders using ordertypes of nonstandard models of arithmetic
date: 2023-10-29
description: All nonstandard models of arithmetic have ordertypes N+Zθ. None has ordertype N+ZR.
tags: math set-throry
related_posts: false
---

It is well known that all countable dense linear order with no endpoints are isomorphic. It is natural to ask if this holds for uncountable linear orders. The answer is no, and there are many proofs of this fact in textbooks of model theory or set theory or on Math StackExchange. Here's a silly one that uses ordertypes of nonstandard models of arithmetic.

The claim is that there exists dense linear order with no endpoints that is not isomorphic to the real line. First we observe that if $$M$$ is a nonstandard model of arithmetic, then $$M$$ has ordertype $$\mathbb{N}+\mathbb{Z}\theta$$, where $$\theta$$ is the ordertype of a dense linear order without endpoint. In other words, every nonstandard model of arithmetic looks like the natural numbers followed by many copies of the integers, such that between any two copies there's another such copy, and every $$\mathbb{Z}$$-chain is preceded and followed by other $$\mathbb{Z}$$-chains.

To see this, note that the standard natural numbers, $$0, s0, ss0,...$$,consist of the $$\mathbb{N}$$ part of $$M$$. And every nonstandard natural number $$a$$ sits in an $$\mathbb{Z}$$-chain $$...a-2,a-1,a,a+1,a+2...$$. For no-end-points: take any $$\mathbb{Z}$$-chain and a nonstandard $$a$$ on it; $$2a$$ and $$a/2$$ (or $$(a+1)/2$$ if $$a$$ is odd) must sit on different $$\mathbb{Z}$$-chains. Why? If $$a$$ and $$2a$$ were on the same chain, then $$a$$ can reach $$2a$$ by standardly-many applications of successor operation, contradicting the assumption that $$a$$ is nonstandard. And for denseness: similar idea, take nonstandard $$a,b$$ on different chains, then $$(a+b)/2$$ (or $$(a+b+1)/2$$ if $$a+b$$ is odd) must sit on a chain between them, because otherwise the midpoint between $$a$$ and $$b$$ would can be reached by either standardly-many applications of successor operation from $$a$$ or predecessor operation from $$b$$, contradicting the assumption that $$a$$ and $$b$$ are nonstandard and sit on different chains.

Next, by the Löwenheim–Skolem theorem there must be nonstandard models of arithmetic of cardinality $$\vert \mathbb{R}\vert$$. If all dense linear orders without endpoints of this size were isomorphic, then such a model would have ordertype $$\mathbb{N}+\mathbb{Z}\mathbb{R}$$. We now argue that there isn't such a model. This argument is due to Klaus Pothoff. 

Assume there is a nonstandard model of arithmetic of ordertype $$\mathbb{N}+\mathbb{Z}\mathbb{R}$$. Take a nonstandard natural number $$a$$, and consider $$(na\mid 0<n\in \mathbb{N})$$. Writing $$\mathbb{Z}_{r_n}$$ for the chain that contains $$na$$, we observe that the sequence $$r_n$$ is an increasing sequence of real numbers bounded above (by the index of the chain that contains $$a^2$$ for example). Then the $$r_n$$'s converge to some $$r$$. Consider the chain $$\mathbb{Z}_r$$. Take an element $$b$$ in it (if there's any multiple of $$a$$ in it, then choose $$b$$ smaller than that). Now we can let $$X:=\{c\mid a \text{ divides } c \wedge c<b\}$$. Now the standard natural numbers can be defined in $$M$$ as $$\{n\mid na\in X\}$$, contradicting the fact that the standard natural numbers are not definable in nonstandard models.

Putting everything together, there must be dense linear orders without endpoints of size continuum but not isomorphic to the real line. 