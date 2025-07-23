import { describe, it, expect } from 'vitest';
import { traverseTree, findNode, collectNodes } from './tree';

type TestNode = {
  id: number;
  children?: TestNode[];
};

const sampleTree: TestNode[] = [
  {
    id: 1,
    children: [
      { id: 2, children: [{ id: 4 }, { id: 5 }] },
      { id: 3, children: [{ id: 6 }, { id: 7 }] },
    ],
  },
];

describe('traverseTree', () => {
  it('should traverse all nodes in the tree', () => {
    const visited: number[] = [];
    traverseTree(
      sampleTree,
      (node) => node.children,
      (node) => {
        visited.push(node.id);
        return true;
      },
    );
    expect(visited).toEqual([1, 3, 7, 6, 2, 5, 4]);
  });

  it('should stop traversal when callback returns false', () => {
    const visited: number[] = [];
    traverseTree(
      sampleTree,
      (node) => node.children,
      (node) => {
        visited.push(node.id);
        return node.id !== 3;
      },
    );
    expect(visited).toEqual([1, 3]);
  });
});

describe('findNode', () => {
  it('should find the first matching node', () => {
    const result = findNode(
      sampleTree,
      (node) => node.id === 5,
      (node) => node.children,
    );
    expect(result).toEqual({ id: 5 });
  });

  it('should return null if no matching node is found', () => {
    const result = findNode(
      sampleTree,
      (node) => node.id === 999,
      (node) => node.children,
    );
    expect(result).toBeNull();
  });
});

describe('collectNodes', () => {
  it('should collect all matching nodes', () => {
    const result = collectNodes(
      sampleTree,
      (node) => node.id % 2 === 0, // Match even ids
      (node) => node.children,
    );
    expect(result).toEqual([
      { id: 6 },
      { id: 2, children: [{ id: 4 }, { id: 5 }] },
      { id: 4 },
    ]);
  });

  it('should return an empty array if no matching nodes are found', () => {
    const result = collectNodes(
      sampleTree,
      (node) => node.id === 999,
      (node) => node.children,
    );
    expect(result).toEqual([]);
  });
});
