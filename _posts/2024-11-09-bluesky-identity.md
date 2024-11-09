---
title: 'Bluesky, Domain Names, and Decentralized Identity'
date: 2024-11-09 12:00:00
description: Thoughts about the utility of domain names in the age of decentralized identity.
featured_image: '/images/blog/social-media-user-unknkown.jpg'
---

## This could have been a thread

I was originally going to make this into a thread on Bluesky, since I tagged myself into The Discourse on the Bluesky “verification” process, and I’ve got Some Thoughts about it. But as the thread got longer, I figured it was probably better as a blog post.

_Disclaimers first: I think the Bsky team is operating in good faith for good reasons, and I applaud their commitment to their mission._

Bluesky's solution to the problem of identity verification currently relies on users configuring their Bluesky handle to be a domain name, as opposed to the default `user.bsky.social` format. And the current concept of [using domain names for handles as a form of portable identity](https://bsky.social/about/blog/3-6-2023-domain-names-as-handles-in-bluesky) is a solid idea! Additionally, the design of [AtProto](https://atproto.com) to be federated and decentralized, even though it can appear very centralized when using bsky.app, makes sense as part of that mission. It’s also true that, I believe, AtProto is the thing that the team REALLY cares about, and that [bsky.app](https://bsky.app) is a way to prove out the AtProto concept/promise, because a naked protocol with no use case probably gets very little adoption.  So we have to view Bluesky the app and the team's decisions through that lens.

Finally, the team has made it clear that they do not want their company/project to be a central chokepoint for things like verification, moderation, labeling, and similar tasks that are commonplace in social media apps. It goes against their ethos, so they are approaching all of those problems in a decentralized way. The currently-implemented distributed labelers and moderation are part of that - users can subscribe to labelers, blocklists, mutelists, etc, that they trust (and unsubscribe if they change their mind).

That said, I think the current Bluesky/AtProto approach for account verification (domain as identity) is going to fail at scale. Which at the current rate of growth, might be sooner than expected. The core issue, as I see it, is that there is no way currently to do decentralized identity (personal, corporate, brand) verification on social, and domain ownership is not a solution.

I’ve been in The Business (tech) for pushing 30 years now, and decentralized identity validation has been a dream for technologists for at least that long. For a while it was going to be PGP keys. Then it was going to be certificate authorities. Now domain names. None of them worked. Or at least, worked outside of a small group of people with similar technical expertise who were ideologically committed to the idea. Once it got outside of that context, the technological requirements to participate at scale fell apart, and eventually the idea receded. Your parents are not going to create a PGP key, sorry.

## The Problem

Fundamentally, the goal of social media verification is to confirm to the general public, at a quick glance, that an account is what it purports to be. Before you share information from an account, you'd like to know that it's legitimate. And effectively, that need means that the social media company (whichever one it is) runs a process to validate that fact by “hand” (checking IDs, contacting authorized representatives, working with brands, etc). At the end of the day, though, it's a person or team running through a process and making a decision as to whether or not to verify a user.

For those who don’t remember, Twitter (RIP) was forced to create its verification system in 2009 when Major League Baseball manager [Tony LaRussa sued the company](https://www.tampabay.com/life-culture/history/2023/04/24/tony-larussa-twitter-blue-checkmark/) after a parody/fake account masquerading as him posted information he deemed damaging. The solution to the suit was to create a process (opaque, capricious, yes) by which “celebrities”, “brands”, and "notable individuals" could prove to Twitter that a given account was officially managed by the given group, after which Twitter would set that account would display a blue check (RIP) to confirm that fact.

The criteria by which verification was awarded aside, this mostly did the job, and as a result, a similar concept is now provided by nearly all major social media platforms. It does what it claims to, and users have learned to rely on the iconography, which is why it has become the standard. So any alternative solution needs to at least meet that standard of being reliable and easy for non-technical users to understand (and, ideally, for them to participate in). While the domain-as-identity concept is a good idea, it doesn't meet that standard.

### When the first lawsuit against Bluesky Inc. about malicious impersonation gets filed, I don't think the team will be able to tell a judge "Tony LaRussa should have registered a domain name and configured DNS records to set that as his handle" and expect that to be a winning defense.

## Domains Ain't Identity

The domain-as-identity concept, at an academic level, seems like a great idea. You own it! You have to prove you own it to use it as your handle! No central authority (excepting ICANN) can take it away! Which is all good. I use my domain name as *MY* handle. I also have a Computer Science degree and write [weird bots](https://github.com/minter/rod_the_bot) for fun. I am not the average user.

However, I believe that the Domain As Identity concept fails at its core advertised purpose: confirming that the account you see is, in fact, what it claims to be. Ownership of a domain name confirms that you own that domain: nothing more, nothing less. And in a world where scams, misinformation, and other bad behaviors are commonplace and growing, enough to influence national elections, the ability to confirm that an account is what it claims to be is more important than ever.

For some well-known domains/subdomains, that can be sufficient. Sen. Ron Wyden ([@wyden.senate.gov](https://bsky.app/profile/wyden.senate.gov)) is pretty clearly US Senator Ron Wyden, since the average yahoo can't get access to a .gov domain. John Scalzi ([@scalzi.com](https://bsky.app/profile/scalzi.com)) is pretty clearly John Scalzi, since he has a digital footprint a mile wide that all refers back to that domain. 

And @nytimеs.com is pretty clearly The New York Times. But is it? That's not an "e" in the handle, it's a unicode replacement character. A dedicated person could set up a website that looks like (or redirects to) nytimes.com, and use that handle. Could you tell at first glance? If it starts posting misinformation, could you tell? (_insert joke about the real NYT posting misinformation here_)

The Bluesky response to that is "Ah! We run our own labeler that every user is required to subscribe to, and if we see an account like that, we'll label it as Impersonation!" Which is a centralized response, if we're being honest, and is very much reactive and not proactive. So I don't think a solution of waiting for the company to notice inauthentic accounts scales. And if that's your answer, you are *in fact* doing centralized verification, just in an opposite and less-helpful direction.

Even so, that eye-test solution really only works for the most popular domains. I am a Z-list celebrity at best, so nobody is going to be able to tell at a glance that [@wademinter.com](https://bsky.app/profile/wademinter.com) is me, and that a website set up at @wade-minter.com is an impostor. And I'm technically adept! I'm doing things the right way!

Is [@thekatemulgrew.bsky.social](https://bsky.app/profile/thekatemulgrew.bsky.social) really Kate Mulgrew of "Star Trek: Voyager" and "Orange is the New Black" fame? Do you know that for sure? Would her account being @katemulgrew.com change your mind? Why? 

This whole discussion kicked off when [Hunter Walker](https://bsky.app/profile/hunterw.bsky.social) of TPM [saw an account for actress Deborah Ann Woll](https://bsky.app/profile/hunterw.bsky.social/post/3l776mvkd6g2a) appear on Bluesky, but had to DM her (verified) account on Instagram to confirm that it was her (_it was, in fact, not her_). So that failed. But we're all pretty sure that [@marawilson.bsky.social](https://bsky.app/profile/marawilson.bsky.social) is the real deal. Functionally, however, there's no difference between the real Mara Wilson and the fake Deborah Ann Woll. This is going to blow up in someone's face at some point.

## You Can't Get There From Here

These are hard problems! And, in technology, there is never a perfect solution. There are always tradeoffs, and managing those tradeoffs is part of the challenge. Especially if your mission is to be decentralized. As [@jcsalterego.bsky.social said](https://bsky.app/profile/jcsalterego.bsky.social/post/3l77dpz654523):

> "for sure. ultimately, i think people have very different ideas and expectations of what bluesky is or should be. and that's ok

Which is a valid point. But as Bluesky (the product) escapes containment and moves from an academic research project and into a mainstream social media platform, the tension between "The users need to learn to use the product in accordance with the mission we built it for" and "We are going to need to build the product to reflect how the users actually want to use it" is going to become more and more difficult to manage. Based on my experience, in those cases, either the users win, or the platform fails (or, potentially, lives but shrinks out of the mainstream).

During the discussion, a few objections came up about a centralized verification solution (paraphrased):

> "Custom domain names ARE the verification solution, and they're easy to set up!"

As I said, I don't think that custom domains _are_ a solution for verification as the term is commonly understood, at least not to the general public. And buying, validating, and maintaining a domain name is not going to happen for the average user, I feel *very* confident in that. Even if you could get the average person to do it, you'd still have the problem of impostor domains that are designed to fool people. I don't think I'm going to be proven wrong on this one. Domains are not easy, not matter how much UI you put on them.

> "If you think a domain name might be an impostor, you can just cross-reference that specific domain against other sources about the account's identity!"

Can you? Sure! Will anyone? No! You can certainly take the stance that if a viewer isn't willing to put that work in, then it's their fault if they get fooled. But that is fully going to doom a platform to failure, because the average person will fully not do that work. Again, academic project vs. real-life human behavior. No average user is going to spend 10 minutes cross-referencing a domain name across multiple different sources to confirm that it's the real deal before sharing a post to their network. Nor should they have to.

> "We are going to teach people a new way to identify with their social media and social identity, and this way will lead to better outcomes."

Cool! I wish you good luck, I think that future would be a good one to live in. But you're looking at a multi-year (at minimum) targeted worldwide user education effort to get there. And that's _if_ everything goes perfectly. Even in that case, you're looking at a very long transition period before the general public is comfortable with the new system. And during that time, you're going to have a lot of people who are going to be frustrated that they've been fooled, and they're going to look for a new platform, or bad actors are going to have a field day.

> "I don't care if it's hard, I don't want another centralized system like Elon Musk's Twitter, because it ended up being a dumpster fire."

I get it! I really do! I had a verified Twitter account before Musk completely destroyed the verification system. I lost my checkmark when I wouldn't pay. I saw how arbitrary the system was pre-Musk about who qualified for verification. I saw how it rewarded status, not identity. And we all saw how one person could remove the verification at will, with no recourse.

However, for any mainstream social network, in this day and age, verification is a required part of the experience. It's unavoidable. You don't have to do it like Elon, but you *do* have to do it.

## All Roads Lead To Centralization

I don't personally think that there's currently a way to do fully decentralized identity verification in a way that is simultaneously accurate, fair, and easy for the average person to use and understand. Perhaps I'm wrong, but I don't see it right now. Domain ownership is absolutely none of those, and it's pretty foolish to pretend otherwise.

Supposing there's agreement that verification is non-optional, I can think of a couple of ways that Bluesky can handle the need:

One would be for Bluesky, like Twitter, to run its own centralized verification system. It would be imperfect, not really in accordance with its mission, but it would get the job done. It could get the job done very quickly. And could be superceded by a different system in the future. Bluesky already does this today with its Bluesky-run labeler system. It marks accounts as impersonation, for example, and could easily add a verification label if it wanted to. Maybe it's a familiar checkmark, maybe it's a prominent label, but the infrastructure to _display_ that label is already in place.

In order to do that, Bluesky (the company) would need to build a system to request, vet, and decide on verification. That takes staff and development time. Fundamentally, though, the principles here are well understood and this option is the easiest to implement.

Another option, perhaps more in the spirit of decentralization, would be to have an independent organization or organizations in charge of the requesting, vetting, and approval decisions. These would be non-Bluesky entities, ideally nonprofits or similar structures with a high degree of trust and security, and could plug into the existing composable moderation infrastructure.

The biggest problem that I see here is that users would have to opt into the verification provider(s) they trust. That requires a way to discover those providers, and a way to subscribe to them. That's a tough UI ask, and likely at some point puts Bluesky in the unenviable position of having to arbitrate disputes between providers. If you have to go seek out a new moderation service to determine if an account is authentic, I don't think many users are going to do that. And if Bluesky enables provider(s) by default, then you're back to the centralized system that Bluesky set out to avoid. This type of system also makes it harder to fight spreading of misinformation, since you're relying on the entirety of the userbase to be using a truested labeler, *and* the labels may not come across via social link sharing.

## Conclusion

Post-election, the number of people on Bluesky is growing rapidly. Celebrities, journalists, brands, and public figures are making the move over. Which is great for the community! But it also means that the need for verification is becoming more urgent. And we can't have [Bluesky developers DM'ing rappers to configure DNS settings](https://bsky.app/profile/jaz.bsky.social/post/3lahqth4y5s26) as a sustainable solution.

Bluesky has a chance to get this right, and I hope they do. I think they can. I firmly believe that domain ownership is not the answer. Now we have to figure out what is.