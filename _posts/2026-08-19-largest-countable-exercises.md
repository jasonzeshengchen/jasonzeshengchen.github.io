---
layout: post
title: Two exercises that bugged me for a while
date: 2026-08-19
description: Two exercises about largest countable definable sets of reals under V=L
tags: descriptive-set-theory recursion-theory exercises
related_posts: false
giscus_comments: true
---

The following exercises are from *Recursion Theory* by Chong & Yu.

- Exercise 4.3.1: Assume $\omega_1^L=\omega_1$. Show that there is no largest countable $\Pi^1_1$ set of reals.
- Exercise 4.4.3: Assume $\omega_1^L=\omega_1$. Show that there is no largest countable $\Sigma^1_2$ set of reals.

In case any future student is desparately googling for a solution, I'll write down my take here.

Let's begin with a warm-up exercise. We show that there is no largest countable $\Sigma^1_1$ set of reals: if $A$ is a countable $\Sigma^1_1$ set of reals, then by the [:effective perfect set theorem](#x-EPST), it contains only hyperarithmetic reals. But it cannot be all of them since the set of hyperarithmetic reals is properly $\Pi^1_1$. So there is always a hyperarithmetic real $x$ outside of $A$. But then $A\cup\{x\}$ is a countable $\Sigma^1_1$ set of reals that strictly contains $A$, so $A$ cannot be the largest.

So that's roughly the idea. Find a kind of definable cover for your countable set that's nevertheless not exhausted by it, and then something new from the cover to get a strictly larger set. The same idea works for the two exercises above, but the details are a bit more involved.

**Exercise 4.3.1**: Assume $\omega_1^L=\omega_1$. Show that there is no largest countable $\Pi^1_1$ set of reals.

*Proof.* We use as our "cover" the largest $\Pi^1_1$ thin set

$$
C:=\{x\in 2^\omega \mid x\in L_{\omega_1^x}\}.
$$

Details about this set can be found in the textbook. The point is that if $A$ is $\Pi^1_1$ and countable then it is a subset of $C$. But $C$ is uncountable, so there is some $x\in C\smallsetminus A$. So now we need to find a way to carve something out of $C$ that we will add to $A$ to get a strictly larger $\Pi^1_1$ set.

To do this we'll use a $\Pi^1_1$ [:norm](#x-NormDef) $\rho$ on $C$. Note that for each $y\in C$ the sets $I_y:=\{x\in C\mid \rho(x)<\rho(y)\}$ and $E_y:=\{x\in C\mid \rho(x)=\rho(y)\}$ are both $\Delta^1_1(y)$ (this is standard and can be easily seen by a definition chase). So they are Borel subsets of $C$, and hence countable.

Now consider $B_A := \{y\in C\mid I_y\subseteq A\}$. Let

$$
\gamma = \min\{\rho(y) : y \in C \setminus A\},
$$

and choose $y_\ast \in C \smallsetminus A$ with $\rho(y_\ast) = \gamma$.

Then:

1. Since every $x \in I_{y_\ast}$ has $\rho(x) < \gamma$, minimality of $\gamma$ gives $x \in A$. Hence $y_\ast \in B_A \setminus A.$ 
2. If $y \in B_A$ and $\rho(y) > \gamma$, then $y_\ast \in I_{y}$, contradicting $I_{y} \subseteq A$. Therefore every $y \in B_A$ has $\rho(y) \le \gamma$.
3. If $y \in B_A$ and $\rho(y) < \gamma$, then the minimality of $\gamma$ gives $y \in A$.

Consequently,

$$
B_A \subseteq A \cup E_{y_\ast}.
$$

Both $A$ and $E_{y_\ast}$ are countable, so $B_A$ is countable and nevertheless contains a real outside $A$.

But $B_A$ is $\Pi^1_1$: $y\in B_A \Leftrightarrow C(y) \wedge (\forall x)(x\in I_y\rightarrow A(x))$. And so $A\cup B_A$ is a countable $\Pi^1_1$ set of reals that strictly contains $A$. Hence $A$ cannot be the largest.

The other exercise is similar. We just have to be more careful about proving the complexity of $B_A$.

**Exercise 4.4.3.** Assume that $\omega_1=(\omega_1)^L$. Then there is no largest countable $\Sigma^1_2$ set of reals.

**Proof.**
Same setup as before. We get a countable set $B_A$ that contains a real not in $A$.

It remains to prove that $B_A$ is $\Sigma^1_2$. Write

$$
x\in A
\quad\Longleftrightarrow\quad
(\exists u)\,R(x,u),
$$

where $R\in\Pi^1_1$.

Let $I^\Sigma(x,y)$ denote the $\Sigma^1_1$ definition of $x\in I_y$:

$$
I^\Sigma(x,y)
\quad\Longleftrightarrow\quad
Q(x,y)\wedge\neg P(y,x).
$$

A real $e$ may be viewed as coding a sequence of reals

$$
\langle e_n:n\in\omega\rangle.
$$

Define $\operatorname{Cover}(e,y)$ to mean that this sequence covers $I_y$:

$$
\operatorname{Cover}(e,y)
\quad\Longleftrightarrow\quad
(\forall x)\bigl(
I^\Sigma(x,y)\rightarrow(\exists n)\,x=e_n
\bigr).
$$

Since $I^\Sigma$ is $\Sigma^1_1$, the relation $\operatorname{Cover}(e,y)$ is $\Pi^1_1$.

Now, because $I_y$ is countable, $I_y\subseteq A$ if and only if there exist reals $e$ and $U$, where $e$ codes a sequence $\langle e_n:n\in\omega\rangle$ and $U$ codes a sequence $\langle u_n:n\in\omega\rangle$, such that

$$
\operatorname{Cover}(e,y)
$$

and

$$
(\forall n)\bigl(
I^\Sigma(e_n,y)\rightarrow R(e_n,u_n)
\bigr).
$$

Indeed, if $I_y\subseteq A$, choose a sequence covering $I_y$, and for each $e_n\in I_y$ choose $u_n$ witnessing $e_n\in A$. Conversely, if such $e$ and $U$ exist and $x\in I_y$, then $x=e_n$ for some $n$, and hence $R(e_n,u_n)$, so $x\in A$.

Thus

$$
\begin{aligned}
y\in B_A
\quad\Longleftrightarrow\quad
(\exists e)(\exists U)\bigl[
&C(y)\wedge \operatorname{Cover}(e,y)\\
&\wedge
(\forall n)\bigl(
I^\Sigma(e_n,y)\rightarrow R(e_n,u_n)
\bigr)
\bigr].
\end{aligned}
$$

The expression inside the brackets is $\Pi^1_1$: $C(y)$ is $\Pi^1_1$, $\operatorname{Cover}(e,y)$ is $\Pi^1_1$, and

$$
(\forall n)\bigl(
I^\Sigma(e_n,y)\rightarrow R(e_n,u_n)
\bigr)
$$

is $\Pi^1_1$ because $I^\Sigma$ is $\Sigma^1_1$ and $R$ is $\Pi^1_1$.

Therefore

$$
B_A\in\Sigma^1_2.
$$

Finally,

$$
A^+=A\cup B_A
$$

is a countable $\Sigma^1_2$ set, and since $y_\ast\in B_A\setminus A$,

$$
A\subsetneq A^+.
$$

Thus every countable $\Sigma^1_2$ set has a proper countable $\Sigma^1_2$ extension. Hence there is no largest countable $\Sigma^1_2$ set of reals.


### :x EPST

which says if a $\Sigma^1_1$ set doesn't have a perfect subset, then there is some computable ordinal $\alpha$ such that the $\alpha$-th Turing jump computes every element of it. See e.g., [Notes on Effective Descriptive Set Theory](https://math.berkeley.edu/~marks/notes/edst_notes3)

### :x NormDef

$\Pi^1_1$ sets have $\Pi^1_1$ norms with height $\omega_1$. That is, there is a surjective function

$$
\rho : C \longrightarrow \omega_1
$$

and relations

$$
P(x,y) \in \Pi^1_1, \quad Q(x,y) \in \Sigma^1_1
$$

such that, whenever $y \in C$,

$$
x \in C \land \rho(x) \le \rho(y) \iff P(x,y) \iff Q(x,y).
$$
