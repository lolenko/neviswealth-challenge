/**
 * Traverses a tree structure and applies a callback to each node.
 * Stops traversal if the callback returns `false`.
 *
 * @template T
 * @param {T[]} nodes - The root nodes to start traversal from.
 * @param {(node: T) => T[] | undefined} getChildren - A function to retrieve the children of a node.
 * @param {(node: T) => boolean} callback - A callback function applied to each node. If it returns `false`, traversal stops.
 */
const traverseTree = <T>(
  nodes: T[],
  getChildren: (node: T) => T[] | undefined,
  callback: (node: T) => boolean,
): void => {
  const stack = [...nodes];

  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    if (!callback(currentNode)) {
      return;
    }
    const children = getChildren(currentNode);
    if (children) {
      stack.push(...children);
    }
  }
};

/**
 * Finds the first node in a tree structure that matches the given criteria.
 *
 * @template T
 * @param {T[]} nodes - The root nodes to start searching from.
 * @param {(node: T) => boolean} exact - A function to determine if the current node matches the search criteria.
 * @param {(node: T) => T[] | undefined} getChildren - A function to retrieve the children of a node.
 * @returns {T | null} The first node that matches the search criteria, or null if no match is found.
 */
const findNode = <T>(
  nodes: T[],
  exact: (node: T) => boolean,
  getChildren: (node: T) => T[] | undefined,
): T | null => {
  let result: T | null = null;

  traverseTree(nodes, getChildren, (node) => {
    if (exact(node)) {
      result = node;
      return false;
    }
    return true;
  });

  return result;
};

/**
 * Collects all nodes in a tree structure that match the given criteria.
 *
 * @template T
 * @param {T[]} nodes - The root nodes to start searching from.
 * @param {(node: T) => boolean} exact - A function to determine if a node matches the search criteria.
 * @param {(node: T) => T[] | undefined} getChildren - A function to retrieve the children of a node.
 * @returns {T[]} An array of all nodes that match the search criteria.
 */
const collectNodes = <T>(
  nodes: T[],
  exact: (node: T) => boolean,
  getChildren: (node: T) => T[] | undefined,
): T[] => {
  const results: T[] = [];

  traverseTree(nodes, getChildren, (node) => {
    if (exact(node)) {
      results.push(node);
    }
    return true;
  });

  return results;
};

export { traverseTree, findNode, collectNodes };
