import EditorToolbarStyle from './EditorToolbarStyle'

// ----------------------------------------------------------------------

const HEADINGS = [
  'Heading 1',
  'Heading 2',
  'Heading 3',
  'Heading 4',
  'Heading 5',
  'Heading 6',
]

export const formats = [
  'align',
  'background',
  'blockquote',
  'bold',
  'bullet',
  'code',
  'code-block',
  'color',
  'direction',
  'font',
  'formula',
  'header',
  'image',
  'indent',
  'italic',
  'link',
  'list',
  'script',
  'size',
  'strike',
  'table',
  'underline',
  'video',
]

type EditorToolbarProps = {
  id: string
  isSimple?: boolean
}

export default function EditorToolbar({
  id,
  isSimple,
  ...other
}: EditorToolbarProps) {
  return (
    <EditorToolbarStyle {...other}>
      <div id={id}>
        <div className="ql-formats">
          <select className="ql-header" defaultValue="">
            {HEADINGS.map((heading, index) => (
              <option key={heading} value={index + 1}>
                {heading}
              </option>
            ))}
            <option value="">Normal</option>
          </select>
        </div>

        <div className="ql-formats">
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-bold" />
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-italic" />
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-underline" />
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-strike" />
        </div>

        {!isSimple && (
          <div className="ql-formats">
            {/* eslint-disable-next-line */}
            <select className="ql-color" />
            {/* eslint-disable-next-line */}
            <select className="ql-background" />
          </div>
        )}

        <div className="ql-formats">
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-list" value="ordered" />
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-list" value="bullet" />

          {!isSimple && (
            /* eslint-disable-next-line */
            <button type="button" className="ql-indent" value="-1" />
          )}
          {!isSimple && (
            /* eslint-disable-next-line */
            <button type="button" className="ql-indent" value="+1" />
          )}
        </div>

        {!isSimple && (
          <div className="ql-formats">
            {/* eslint-disable-next-line */}
            <button type="button" className="ql-script" value="super" />
            {/* eslint-disable-next-line */}
            <button type="button" className="ql-script" value="sub" />
          </div>
        )}

        {!isSimple && (
          <div className="ql-formats">
            {/* eslint-disable-next-line */}
            <button type="button" className="ql-code-block" />
            {/* eslint-disable-next-line */}
            <button type="button" className="ql-blockquote" />
          </div>
        )}

        <div className="ql-formats">
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-direction" value="rtl" />
          {/* eslint-disable-next-line */}
          <select className="ql-align" />
        </div>

        <div className="ql-formats">
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-link" />
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-image" />
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-video" />
        </div>

        <div className="ql-formats">
          {/* eslint-disable-next-line */}
          {!isSimple && <button type="button" className="ql-formula" />}
          {/* eslint-disable-next-line */}
          <button type="button" className="ql-clean" />
        </div>
      </div>
    </EditorToolbarStyle>
  )
}
