import { styled } from 'goober'
import type { HTMLAttributes } from 'preact'

interface FormattedTextProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, 'children' | 'dangerouslySetInnerHTML'> {
  text: string
}

const Root = styled('p')`
  margin: 0;
  line-height: 1.6;
  font-size: 0.98rem;
`

export const FormattedText = ({ text, ...props }: FormattedTextProps) => (
  <Root {...props} dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }} />
)

function sanitizeHtml(raw: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(raw, 'text/html')

  Array.from(doc.body.querySelectorAll('*')).forEach((element) => {
    const tag = element.tagName.toLowerCase()
    if (!['strong', 'b', 'em', 'i', 'u', 'br', 'a'].includes(tag)) {
      element.replaceWith(...element.childNodes)
      return
    }

    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase()
      if (!['href'].includes(name)) {
        element.removeAttribute(attribute.name)
        return
      }

      if (name === 'href') {
        const href = attribute.value.trim()
        const isHttp = /^https?:\/\//i.test(href)
        const isInternal = href.startsWith('/') || href.startsWith('#')
        if (!isHttp && !isInternal) element.removeAttribute(attribute.name)
      }
    })
  })

  return doc.body.innerHTML
}
