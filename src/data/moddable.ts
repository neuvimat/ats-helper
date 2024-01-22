export class Mod {
  constructor(
    public value: number,
    public source: string
  ) {}
}
export class Moddable {
  constructor(
    public id: string,
    public mods: Mod[] = []
  ) {}
}
