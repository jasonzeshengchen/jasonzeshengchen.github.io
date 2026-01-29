---
layout: post
title: Two Alternative Proofs of Analytic Measurability
date: 2025-12-09
description: Proving analytic sets are measurable using recursion theory and forcing
tags: math set-theory forcing measure-and-category recursion-theory
related_posts: false
giscus_comments: true
---
In 1917, Luzin announced that every analytic set of real numbers is Lebesgue measurable, a result that remains a cornerstone of descriptive set theory and measure theory. Typical expositions characterize analytic sets in terms of [:Suslin's operation](https://en.wikipedia.org/wiki/Suslin_operation) and prove that the operation preserves measurability. Being good logicians, however, one likes to think of the analytic sets as defined by $\Sigma^1_1$ formulas (with parameter) in the language of second-order arithmetic, and coanalytic set as those defined by $\Pi^1_1$ formulas. This facilitates the strucutral theory of these sets via ill-founded and well-founded trees, a perspective that we'll conveniently exploit in the following two alternative proofs of analytic measurability.

#### The forcing proof

(see, e.g., *Judah, Haim. "Absoluteness for projective sets." Logic colloquium. Vol. 90. 1990.*):
> **Theorem**. Every $\mathbf{\Sigma}^1_1$ set of reals is Lebesgue measurable.

*Proof.* Suppose $A:=\\{x\in\mathbb{R}\mid \varphi(x,a)\\}$, where $\varphi$ is $\Sigma_1^1$ and $a\in \mathbb{R}$. Now consider the random forcing poset $\mathcal{B}/\mathrm{Null}$. Let $X$ be a $G_\delta$ set that forces $\varphi(\dot r, \check a)$ (or rather, its equivalence class in the random forcing algebra does), where $\dot{r}$ is a canonical name of the random real added. 
    
Claim: $\mu(X\triangle A)=0$. (This is just the equivalent formulation of the measurability of $A$.). 

To see the claim, assume towards a contradiction that, say, $B=A\smallsetminus X$ has positive outer measure (the case where $X\smallsetminus A$ has positive outer measure is similar). Pick some $H_\kappa$ large enough, so that it contains $a,A,X$ and reflects the relevant facts, such as that $H_\kappa \vDash [\mathbb{R}\smallsetminus X]\Vdash \neg\varphi(\dot r,\check a)$. Now let $\pi: N\to H_\kappa$ be an elementary embedding where $N$ is countable transitive with $a,X,A,B\in\mathrm{ran}(\pi)$. Write $\pi(\bar A)=A, \pi(\bar X)=X, \pi(\bar B)=B$.  

It follows that there is a real $r\in B$ random over $N$. Notice that $[B]$ is a stronger condition than $[\mathbb{R}\smallsetminus X]$. And we have $N[r]\vDash \varphi(r, a)$, since $r\in A$ by assumption and $\Sigma^1_1$ formulas are absolute between $V$ and $N[r]$. But this last fact contradicts that $N\vDash [\bar B]\Vdash \neg\varphi(\dot r, \check a)$, because with $r\in B$ we would also have $N[r]\vDash \neg\varphi(r,a)$. 


#### The recursion-theoretic proof

(except for the proof itself, all the ingredients appeared in *Sacks, Gerald E. "Measure-theoretic uniformity in recursion theory and set theory." Transactions of the American Mathematical Society 142 (1969): 381-420.*)

> **Theorem**. Every $\mathbf{\Pi}^1_1$ set of reals is Lebesgue measurable.

*Proof.* We prove the lightface version of this claim. The general case generalizes straightforwardly. 

So let $A$ be a $\Pi^1_1$ set of reals. By standard facts in descriptive set theory (e.g., [see my notes]((https://jasonzeshengchen.github.io/notes/Nov_22_2022_Sigma11_normal_form_norms_prewellorderings.pdf))), there is a recursive tree $T$ on $\omega\times\omega$ such that $x\in A$ iff $T_x$ is well-founded, where $T_x:=\\{\sigma\in\omega^{<\omega}\mid (x\upharpoonright \|\sigma\|,\sigma)\in T\\}$. Let $r:\mathbb{R}\to \omega_1\cup\\{\infty\\}$ map $x$ to the rank of $T_x$ if $x\in A$ and to $\infty$ otherwise.

Now, the rank of $T_x$ is bounded by $\omega_1^{CK}(x)$. This means that for all $x$, $x\in A$ iff $r(x)<\omega_1^{CK}(x)$. But a classic result by Sacks shows that the set $\\{x\mid \omega_1^{CK}(x)=\omega_1^{CK}\\}$ has measure one, which in turn implies that for measure one many reals, we have $x\in A$ iff $r(x)=\omega_1^{CK}$.

Finally, since the set $\\{x\mid r(x)=\omega_1^{CK}\\}$ is Borel, the previous paragraph amounts to showing that the symmetric difference between $A$ and this set has measure zero, which is equivalent to saying that $A$ is measurable.