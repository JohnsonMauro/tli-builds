// Chest Armor imports
import dexChestArmor from "./legendary/chest-armor/dex/dexChestArmor.json";
import intChestArmor from "./legendary/chest-armor/int/intChestArmor.json";
import specialChestArmor from "./legendary/chest-armor/special/specialChestArmor.json";
import strChestArmor from "./legendary/chest-armor/str/strChestArmor.json";

// Helmet imports
import dexHelmet from "./legendary/helmet/dex/dexHelmet.json";
import intHelmet from "./legendary/helmet/int/intHelmet.json";
import specialHelmet from "./legendary/helmet/special/specialHelmet.json";
import strHelmet from "./legendary/helmet/str/strHelmet.json";

// Gloves imports
import dexGloves from "./legendary/gloves/dex/dexGloves.json";
import intGloves from "./legendary/gloves/int/intGloves.json";
import specialGloves from "./legendary/gloves/special/specialGloves.json";
import strGloves from "./legendary/gloves/str/strGloves.json";

// Boots imports
import dexBoots from "./legendary/boots/dex/dexBoots.json";
import intBoots from "./legendary/boots/int/intBoots.json";
import specialBoots from "./legendary/boots/special/specialBoots.json";
import strBoots from "./legendary/boots/str/strBoots.json";

// Shield imports
import dexShield from "./legendary/shield/dex/dexShield.json";
import intShield from "./legendary/shield/int/intShield.json";
import specialShield from "./legendary/shield/special/specialShield.json";
import strShield from "./legendary/shield/str/strShield.json";

// Trinket imports
import necklace from "./legendary/trinket/necklace/necklace.json";
import ring from "./legendary/trinket/ring/ring.json";
import belt from "./legendary/trinket/belt/belt.json";
import spiritRing from "./legendary/trinket/spirit-ring/spiritRing.json";

// One-Handed imports
import claw from "./legendary/one-handed/claw/claw.json";
import dagger from "./legendary/one-handed/dagger/dagger.json";
import oneHandedSword from "./legendary/one-handed/one-handed-sword/oneHandedSword.json";
import oneHandedHammer from "./legendary/one-handed/one-handed-hammer/oneHandedHammer.json";
import oneHandedAxe from "./legendary/one-handed/one-handed-axe/oneHandedAxe.json";
import wand from "./legendary/one-handed/wand/wand.json";
import rod from "./legendary/one-handed/rod/rod.json";
import scepter from "./legendary/one-handed/scepter/scepter.json";
import cane from "./legendary/one-handed/cane/cane.json";
import pistol from "./legendary/one-handed/pistol/pistol.json";

// Two-Handed imports
import twoHandedSword from "./legendary/two-handed/two-handed-sword/twoHandedSword.json";
import twoHandedHammer from "./legendary/two-handed/two-handed-hammer/twoHandedHammer.json";
import twoHandedAxe from "./legendary/two-handed/two-handed-axe/twoHandedAxe.json";
import tin from "./legendary/two-handed/tin/tin.json";
import staff from "./legendary/two-handed/staff/staff.json";
import cudgel from "./legendary/two-handed/cudgel/cudgel.json";
import bow from "./legendary/two-handed/bow/bow.json";
import crossbow from "./legendary/two-handed/crossbow/crossbow.json";
import musket from "./legendary/two-handed/musket/musket.json";
import fireCannon from "./legendary/two-handed/fire-cannon/fireCannon.json";

// Chest Armor exports
export const chestArmor = {
  dex: dexChestArmor,
  int: intChestArmor,
  special: specialChestArmor,
  str: strChestArmor,
};

// Helmet exports
export const helmet = {
  dex: dexHelmet,
  int: intHelmet,
  special: specialHelmet,
  str: strHelmet,
};

// Gloves exports
export const gloves = {
  dex: dexGloves,
  int: intGloves,
  special: specialGloves,
  str: strGloves,
};

// Boots exports
export const boots = {
  dex: dexBoots,
  int: intBoots,
  special: specialBoots,
  str: strBoots,
};

// Shield exports
export const shield = {
  dex: dexShield,
  int: intShield,
  special: specialShield,
  str: strShield,
};

// Trinket exports
export const trinket = {
  necklace,
  ring,
  belt,
  spiritRing,
};

// One-Handed exports
export const oneHanded = {
  claw,
  dagger,
  oneHandedSword,
  oneHandedHammer,
  oneHandedAxe,
  wand,
  rod,
  scepter,
  cane,
  pistol,
};

// Two-Handed exports
export const twoHanded = {
  twoHandedSword,
  twoHandedHammer,
  twoHandedAxe,
  tin,
  staff,
  cudgel,
  bow,
  crossbow,
  musket,
  fireCannon,
};

// General gear export
export const gear = {
  legendary: {
    chestArmor,
    helmet,
    gloves,
    boots,
    shield,
    trinket,
    oneHanded,
    twoHanded,
  },
};
