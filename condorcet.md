---
layout: page-3
title: Condorcet Methods
banner: Condorcet Methods Explained
description: An Interactive Guide to Alternative Voting Methods
byline: By Paretoman and Contributors, June 2019
twuser: paretoman1
---

Draft

Here are a couple Condorcet-compliant voting methods.  They use a rule that guarantees the Condorcet winner will win if it exists.  That's a candidate that beats all the others head-to-head. They're a little more complicated to describe than approval voting or Ranked Choice Voting, and for that mental effort upfront, you get the benefit of not needing to think about the polls to decide who to vote for.. because a strategy would probably backfire.

<h2>
Minimax
</h2>

Minimax is a Condorcet method. That means if there's a guy that beats everyone head to head, then that guy wins. That's easy. It's a clear winner. Sometimes there isn't a clear winner. Then you go through some rules. If you're just finding one winner, then the rules are pretty simple. You want to find who lost by the least, basically. So just start crossing off all the smallest losses until there is that guy that has no losses.

**Try it out below.**

{% include sim-test.html
title = "Minimax"
id = "election27" %}

<h2>
Schulze
</h2>

Schulze breaks ties in a way that aligns with the intent of a Condorcet winner; Schulze takes all the pairs of candidates and strings the pairs together into chains. At the beginning of the chain is the winner and at the end the loser. The strength of a chain is only as strong as its weakest link. There are many chains between any pair of candidates. The strongest chain is found for each pair. Magically, there is only one candidate who goes undefeated. This is a really cool way to break ties.

**Try it out below.**

{% include sim-test.html
title = "Schulze"
id = "election30" %}

<h2>
Schulze Alternative
</h2>

Here's an alternative way to count Schulze that is a lot like Minimax, but with an extra rule. Also, I may have the implementation incorrect, but it seems to work. Again, this Schulze Alternative breaks ties in a way that aligns with the intent of a Condorcet winner; there's a tie, so it sees who is tied, and just picks from that group. The candidates with the least losses are automatically in that group, and also we add in anybody that beat them (and anybody that beats anybody we add). Then we have a group that beats everyone, and we pick from that group. After that, it's just minimax. Resolve the tie by making the smallest change you can; remove the smallest tie. And keep making that Condorcet group each step (this is called the Schwartz set if you want to tell your friends).

**Try it out below.**

{% include sim-test.html
title = "Schulze Alternative"
id = "election29" %}

<h2>
Ranked Pairs
</h2>

Ranked pairs is a lot like Minimax. If there's a clear winner that beats everyone head-to-head, then they are the winner. If there isn't a clear winner, then we follow some rules. If you're just interested in the #1 winner and not #2, then the rules are pretty simple. You want to find who won by the most, basically. So start crossing off candidates that lost by a lot. Unless they are the last one left and the guy they lost to already had a bigger loss. Also, you can just stop once you figure out who the winner is. You don't have to go through the whole list.

**Try it out below.**

{% include sim-test.html
title = "Ranked Pairs"
id = "election28" %}

This page is a draft, and I'd like to expand it in the future.  There is a lot more to say.  For example, you may have noticed the above examples seem to all be ties, so what does it matter which condorcet method we choose?  They all seem to be about the same.  And what are these colors in the background all about? And what does a ballot look like? It's a ranking.  I'd like to go over all this in more detail.

Finally, here's a sandbox for you to try out all the different systems and to make your own scenarios: