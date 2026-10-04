
interface Props { children: React.ReactNode, groupName: string }

export const SystemaAttributeItemCard = ({ children, groupName }: Props) => {
  return (
    <div className="  border-b border-border-subtle  last:border-b-0">
      {/* Group title */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          {groupName}
        </p>
      </div>

      {/* Attributes */}
      <div className="px-4 pb-3">
        <div className="divide-y divide-border-subtle ">
          {children}
        </div>
      </div>
    </div>
  )
}
