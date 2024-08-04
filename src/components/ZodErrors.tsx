export function ZodErrors({ error }: { error: string[] | undefined }) {
    if (!error) return null;
    return error.map((err: string, index: number) => (
      <div key={index} className="text-pink-500 text-xs italic mt-1">
        {err}
      </div>
    ));
  }