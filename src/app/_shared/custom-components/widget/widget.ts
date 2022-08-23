export abstract class Widget {
  loading: boolean = false;

  abstract load(): void;

  abstract refresh(): void;
}
