interface ListNode {
  value: number;
  next: ListNode | null;
}

export class LinkedList {
  head: ListNode | null = null;
  nodes: ListNode[] = [];

  insertAtHead(value: number) {
    const newNode: ListNode = { value, next: this.head };
    this.head = newNode;
    this.updateNodes();
  }

  insertAtTail(value: number) {
    const newNode: ListNode = { value, next: null };
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.updateNodes();
  }

  deleteNode(value: number) {
    if (!this.head) return;

    if (this.head.value === value) {
      this.head = this.head.next;
      this.updateNodes();
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this.updateNodes();
        return;
      }
      current = current.next;
    }
  }

  private updateNodes() {
    this.nodes = [];
    let current = this.head;
    while (current) {
      this.nodes.push(current);
      current = current.next;
    }
  }

  getNodes() {
    return this.nodes;
  }
}