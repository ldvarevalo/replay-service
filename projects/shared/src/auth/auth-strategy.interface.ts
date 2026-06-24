export interface AuthStrategy {
  validate(token: string): Promise<boolean>;
}
