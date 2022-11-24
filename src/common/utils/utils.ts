export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function arrayToOrderedListString(arr: string[]): string {
  let final = "";
  arr.forEach((item, index) => {
    let curr = index + 1 + ". " + item + "\n";
    final += curr;
  });

  return final;
}
