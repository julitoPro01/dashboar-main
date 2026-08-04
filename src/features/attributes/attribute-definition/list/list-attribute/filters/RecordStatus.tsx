import { FloatingWrapper } from "@/src/shared/components/floating";
import { SelectableItem } from "@/src/shared/components/items";
import { RECORD_STATUS_LABEL, RECORD_STATUS_STYLES, RecordStatusDb, serializeRecordStatus } from "@/src/shared/domains/status";
import { CellTitle } from "@/src/shared/table/core";
import { OpenFilterButton, AppliedFilterLabel} from "@/src/shared/table/filters"
import { createURLPaginationParams, parsePaginationParams } from "@/src/shared/table/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const RecordStatus = () => {

  const searchPar = useSearchParams();
  const router = useRouter();
  const state = searchPar.get("state");

  const [status, setStatus] = useState<{ value?: RecordStatusDb, active: boolean }>({ active: false });

  const handleApply = (value?: RecordStatusDb) => {
    setStatus(v => ({ ...v, value }));
    const par = serializeRecordStatus(value);

    const url = createURLPaginationParams({
      basePath:"",
      searchParams:searchPar,
      query:{state:par,page:1}
    },{deleteState: !value, includeState:true })

    router.replace(url, { scroll: false })
  }

  useEffect(() => {

    const state = parsePaginationParams(searchPar, { includeState: true }).state
    setStatus(v => ({ ...v, value: state }))

  }, [state]);

  return (
    <>
      <CellTitle title="Estado" >
        <OpenFilterButton
          active={status.active}
          onClick={() => setStatus(v => ({ ...v, active: !v.active }))}
        />
      </CellTitle>

      {!status.active && status.value !== undefined && <AppliedFilterLabel label={RECORD_STATUS_LABEL[status.value]} onClick={() => handleApply()} />}

      <FloatingWrapper open={status.active} onClose={() => setStatus(v => ({ ...v, active: false }))} >
        <div className="p-2 w-40">
          {listStatus.map((item) => (
            <SelectableItem
              key={item.label}
              label={item.label}
              isSelected={item.value === status.value}
              activeBullet
              bulletStyle={item.value !== undefined ? RECORD_STATUS_STYLES[item.value].colorBg400 : undefined}
              onClick={() => handleApply(item.value)} />
          ))}
        </div>
      </FloatingWrapper>
    </>
  )
}

const listStatus: { label: string, value?: RecordStatusDb }[] = [{
  label: "Todos",
  value: undefined
}, {
  label: "Activos",
  value: "ACTIVE"
}, {
  label: "Inactivos",
  value: "INACTIVE"
}]