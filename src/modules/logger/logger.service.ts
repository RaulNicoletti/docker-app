import { Injectable, Logger } from '@nestjs/common';
import * as chalk from 'chalk';

@Injectable()
export class LoggerService extends Logger {
  log(obj: any, groupName = 'Info') {
    console.log('\n');
    console.group(
      chalk.greenBright(`[${groupName}] -`),
      chalk.whiteBright(new Date().toLocaleString()),
    );
    this.iterateLog(obj);
    console.groupEnd();
  }

  error(obj: any, groupName = 'Exception') {
    console.log('\n');
    console.group(
      chalk.redBright(`[${groupName}] -`),
      chalk.whiteBright(new Date().toLocaleString()),
    );
    this.iterateLog(obj);
    console.groupEnd();
  }

  private iterateLog(obj: any) {
    Reflect.ownKeys(obj).forEach((prop) =>
      console.log(chalk.blueBright(prop), obj[prop]),
    );
  }
}
