# System Design Masterclass

Welcome to the System Design Masterclass. This core curriculum maps directly to standard FAANG engineering interview templates. We will explore distributed computing, scaling metrics, and architectural trade-offs.

## 1. Vertical vs Horizontal Scaling

Before delving into complex orchestration, you must understand how to scale hardware to meet demand.

### Vertical Scaling (Scale-Up)
Vertical scaling means adding more power (CPU, RAM) to your existing machine.
- **Pros:** Extremely simple to implement. No code changes required. It inherently supports ACID transactions.
- **Cons:** There is a hard physical limit. If the server goes down, the entire application drops (SPOF - Single Point of Failure).

### Horizontal Scaling (Scale-Out)
Horizontal scaling means adding more machines into your pool of resources.
- **Pros:** Virtually infinite theoretical scaling length. High availability.
- **Cons:** High system complexity. Requires Load Balancers, session architecture overhauls (Redis instances), and eventual consistency paradigms.

## 2. Load Balancing

A Load Balancer acts as the traffic cop sitting in front of your servers and routing client requests across all servers capable of fulfilling them in a manner that maximizes speed and capacity utilization.

### Common Algorithms
- **Round Robin:** Sequential request routing sequentially down the node list.
- **Least Connections:** Routes traffic to the server with the fewest active connections.
- **IP Hash:** The hash of the IP determines which server receives the request, useful for session persistence.

> "A load balancer is the gateway to horizontal architecture."

## 3. Database Replication and Sharding

When traffic scales, the primary database node becomes the ultimate bottleneck.

* **Replication** replicates your master node to read-only replica nodes. Writes go to the master, reads scale across replicas.
* **Sharding** strictly divides the data into multiple smaller databases. For example, Users A-M on DB 1, Users N-Z on DB 2.

## Next Steps
In the next section, we will cover Caching layers (Redis / Memcached) and Content Delivery Networks (CDN).
