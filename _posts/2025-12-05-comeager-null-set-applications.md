---
layout: post
title: Applications of a comeager null set
date: 2025-12-05
description: Size of ground model reals, generic reals, and Luzin (and Sierpinski) sets
tags: math set-theory forcing measure-and-category
related_posts: false
---
There are a number of classic examples[^1] of simple sets of reals that are [:comeager](#x-comeager) and [:null](#x-null). These examples are usually used to illustrate the orthogonality of measure and category: a set can be large in the measure-theoretic sense but small in Baire-category (i.e., more topological) terms, and vice versa. However I've recently come into a few applications of these sets beyond just intuition-checking.

#### Size of ground model reals
> **Fact.** After adding a Cohen real, the set of ground model reals is null. Dually, after adding a random real, the set of ground model reals is meager.

*Proof.* The real line is provably the union of a meager set $A$ and a null set $B$, and this partition is absolute across forcing extensions (once we re-interpret the Borel codes). If $c$ is Cohen, then for every ground model real $r$, we have $r\in c-B$ ([:why?](#x-why1)). Since measure is preserved by translation, then $c-B$ is null, so the ground model reals are a subset of a null set, hence null. The dual argument works for random reals.

#### Size of generic reals
> **Fact.** After adding a Cohen real, the set of Cohen reals over the ground model is null. Dually, after adding a random real, the set of random reals over the ground model is meager.

*Proof.* Similar reasoning as above. Every Cohen real will avoid the meager set $A$, so the set of Cohen reals is a subset of the null set $B$. Dually for random reals.

#### Size of Luzin and Sierpinski sets when both exist
> **Theorem.** (Rothberger 1938) If there is a [:Luzin set](https://en.wikipedia.org/wiki/Luzin_space#In_real_analysis) and a [:Sierpinski set](https://en.wikipedia.org/wiki/Sierpi%C5%84ski_set), then both have cardinality $\omega_1$. Consequently, the continuum hypothesis holds.
(See also Theorem 2.3 in Miller's chapter [Special Subsets of the Real Line](https://people.math.wisc.edu/~awmille1/res/special.pdf)in the Handbook of Set-Theoric Topoplogy.)

The comeager null set is used in the following lemma:
> **Lemma.** If $X$ is not meager and has cardinality $\kappa$, then the real line is the union of $\kappa$ many null sets (similarly with null and meager swapped).

*Proof of Lemma.* Let $A$ be a comeager null set. The real line can be covered by sets of the form $\\{x+A \mid x\in X\\}$: for if some $z$ is not in any of these sets, then the comeager set $z-A$ is disjoint from $X$, contradicting the non-meagerness of $X$. 

*Proof of Theorem.* Since the subset of a Luzin (resp. Sierpinski) set is still Luzin (resp. Sierpinski), then there must be such sets of size $\omega_1$. Suppose $L$ is such a Luzin set. By the lemma, since $L$ is non-meager, the real line is the union of $\|L\|=\omega_1$ many null sets $N_\alpha$. It follows that any Sierpinski set must have size at most $\omega_1$, this is because if $S$ is Sierpinski, then it intersects each of those null sets in countably many points, and since $S=\mathbb{R}\cap S = (\bigcup_{\alpha<\omega_1}N_\alpha) \cap S=\bigcup_{\alpha<\omega_1}(N_\alpha \cap S)$, we have $\|S\|\leq \omega_1\cdot \omega = \omega_1$. Similarly for Luzin sets. Thus both have size exactly $\omega_1$, and so the continuum hypothesis holds.

### :x comeager
A set is comeager iff its complement is meager (a.k.a. of first category). Meager means it can be written as the countable union of nowhere dense sets.

### :x null
This is an other way of saying Lebesgue measure zero. 

### :x why1
$c$ avoids every ground model-coded meager set, by Solovay's characterization of Cohen-genericity. Thus $c\notin r+A$, this means $c\in r+B$, and hence $r\in c-B$.

---

[^1]: For reference, see the [Liouville numbers](https://en.wikipedia.org/wiki/Liouville_number#Liouville_numbers_and_measure), or the [classic construction](https://mathoverflow.net/a/43480/147031), or the [non-normal numbers](https://mathoverflow.net/a/43511/147031). 
