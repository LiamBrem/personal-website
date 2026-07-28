const e=`---
title: Raft vs. Paxos (explained simply) 
date: 2026-07-27
description: The battle of the 2 most popular consensus algorithms...but what's the actual difference?
---

For many years, Paxos was considered the go-to distributed system consensus algorithm. However, for the past decade or so, Raft has been gaining popularity as a simpler alternative. Despite this, many people still don’t understand the differences between them and the advantages each offers other the other.

# What is a consensus algorithm?

I’m going to assume you know what a distributed system is, at least at a high level, and why they’re used.

If not, check [this](https://www.atlassian.com/microservices/microservices-architecture/distributed-architecture) out.

In a distributed system, multiple nodes need to communicate with one another to remain consistent. For example, if you have 5 nodes that your users interact with, you’d want each node to (eventually) contain the same data as every other one. The difficult part is that nodes may fail or crash, network delays may occur, or countless other issues may arise.

The process of ensuring consistent data despite these problems is known as a consensus algorithm. Raft and Paxos are both consensus algorithms used to achieve data consistency and fault tolerance within distributed systems, with their goal being to ensure that a network of nodes agrees on some form of data.

# How does Raft work?

I’m going to be going in reverse-chronological order (as Paxos predates Raft by a few decades) because Raft is known to be easier to understand.

Raft follows what’s known as a “leader-follower” model, where all writes go through the leader, but reads can go through any node. This means that the leader is essentially “in charge” of all the data and the followers exist as backups if the leader fails or as other options for users to read from.

But what happens if the leader does fail? Now, we just have a bunch of follower nodes that can’t write data to any of the other nodes or even themselves! Well, this is where the real magic of Raft shows itself.

### Leader Election

- Followers will detect that the leader is down if they don’t receive any messages from the leader after a certain amount of time.
- Once a follower detects this, it will transition to the candidate state and begin a new election.
- It will then send requests to the other nodes to vote for it.
- If a majority of the nodes vote for it, then that node will establish itself as the new leader, and the rest of the nodes will recognize it as such.

Sounds simple, right? But what if 2 or more nodes elect themselves as candidates before they get a candidate request from another candidate? This is where we have to introduce the concept of terms, which is basically just a period of time (similar to serving a term in the government). At a high level, each node wants to listen to whatever node has the highest term.

So, when a node first votes for itself as a candidate, it will increase its term and give that to the other nodes alongside its vote request. This also means, if a candidate is waiting for votes and it receives a message from another node with a term at least as high as its own, it will recognize the other node as the new leader and forfeit its candidacy. This means, once that node that originally failed comes back up, it will receive a message with a term much higher than its own and recognize that as the new leader.

The opposite is also true, if a node receives a message with a term lower than the one it’s currently on, it will disregard it.

However, there’s still the issue of 2 nodes proposing an election at the same time and votes getting split so that there’s no true winner. If this happens, the candidate nodes will begin a new election, but not before timing out for a randomized amount of time. The hope is that one candidate will send a new request by the time the other candidate(s) are finished waiting. This does mean that this process can theoretically get “stuck” indefinitely, but after a short amount of time, this becomes astronomically unlikely.

# How does Paxos work?
In order to achieve consistency, Paxos doesn’t require a leader model. To first understand Paxos, you need to know the 3 different roles a node may have:

- Proposers are the nodes that receive requests from the users and propose them to acceptors.
- Acceptors accept values from proposers if they’re valid or return valid values back to proposers.
- Learners learn which value has been chosen.


(Technically, a node can operate as all 3 roles simultaneously, but for sake of explaining, it’s easier to imagine each node as having 1 role at a time.)

Once a proposer receives a request, Paxos ensures consistency through several phases:

- Prepare:
    - A proposer sends a prepare message and a proposal number to the acceptors.
    - Once an acceptor receives the message, if the proposal number is greater than any one it’s seen before, it replies with a promise message.
- Promise
    - The acceptors reply with a promise to not accept any new messages with a lower proposal number.
    - If the acceptor has accepted any prior proposals, it responds with that number + the value corresponding to that number.
    - If it hasn’t accepted any prior proposal, it will respond with an empty promise.
- Accept
    - If the proposer receives promises from the majority of acceptors, the accept phase ensues.
    - The proposer sends an accept message to the acceptor with the same proposal number and the value to write.
    - If the proposal number isn’t lower than any previously seen proposal number, the acceptors will accept the proposal.
- Learn
    - The decision is propagated to the learners.

Because of this set of rules, the acceptors can only ever agree on one value. Similarly to Raft, one of Paxos’s biggest strengths is that it can continue to operate even when nodes fail. As long as a majority of acceptors are still alive, the algorithm can continue making progress.

# Raft and Paxos Compared

### Understandability

Many people consider Paxos to be more “difficult” to understand. One of the motivations for creating Raft was directly because of this. However, while Paxos’s phases can be somewhat more abstract, once you boil down how both algorithms actually operate, it’s easy to understand, at a high level, how each works. Both algorithms also have many variants and optimizations that are out of the scope of this article, but make both of these algorithms very in-depth in practice.

### Optimizations

- Raft: Raft has a strong leadership model and is easier to implement. Furthermore, it has log replication actually built in to the protocol.
- Paxos: Paxos is much more flexible with many more variants than Raft, each optimizing for different things. Classic Paxos is also much less performant than raft (although some variants can bring it up to the same level).
- Both: Both algorithms ensure safety, making sure that each node eventually agrees on a single value. Both algorithms also tolerate failures, as long as a majority of voting nodes remain available.

## Read More

If you want a deeper understanding of either of these algorithms, I suggest reading the original papers and some other materials:

The Raft Paper: https://web.stanford.edu/~ouster/cgi-bin/papers/raft-atc14
Paxos Made Simple: https://lamport.azurewebsites.net/pubs/paxos-simple.pdf
The original Paxos paper: https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf
Raft visualization: https://raft.github.io
Paxos variations: https://paxos.systems/variants
`;export{e as default};
