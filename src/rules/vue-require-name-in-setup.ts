import type { Rule } from 'eslint'

// Minimal type definitions for the AST nodes we use
type CallExpressionNode = {
  arguments?: {
    type: string
    properties?: {
      type: string
      key?: {
        type: string
        name?: string
      }
    }[]
  }[]
}

const rule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require defineOptions with name attribute in script setup Vue components',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    // This will be true if we find defineOptions with a name property
    let hasDefineOptionsWithName = false

    return {
      // We'll assume every Vue file with script setup needs a defineOptions name
      // Check for defineOptions function calls
      'CallExpression[callee.name="defineOptions"]'(node: CallExpressionNode) {
        // Check if the first argument is an object expression
        if (node.arguments?.length && node.arguments[0]?.type === 'ObjectExpression') {
          const properties = node.arguments[0].properties || []

          // Look for a name property
          for (const prop of properties) {
            if (prop.type === 'Property' && prop.key?.type === 'Identifier' && prop.key?.name === 'name') {
              hasDefineOptionsWithName = true
              break
            }
          }
        }
      },

      // At the end of the file, report if we don't have defineOptions with name
      'Program:exit'(node) {
        // Check if this is a Vue file by file extension
        const filename = context.physicalFilename
        const isVueFile = filename.endsWith('.vue')

        if (isVueFile && !hasDefineOptionsWithName) {
          // Find script setup tag in source code text
          const sourceCode = context.sourceCode.getText()
          const hasScriptSetup = /<script\s+setup/.test(sourceCode)

          if (hasScriptSetup) {
            context.report({
              node,
              message: 'Component name is required. Add defineOptions({ name: "YourComponentName" }) to your <script setup>',
            })
          }
        }
      },
    }
  },
}

export default rule
