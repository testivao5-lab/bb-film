// AUTO-GENERATED scene registry (tools/gen_film.py). Do not edit by hand — edit the scene files.
import React from "react";
import { ColdOpen } from "../scenes/ColdOpen";
import * as s002_abq from "./scenes/s002_abq";
import * as s003_fifty from "./scenes/s003_fifty";
import * as s004_classroom from "./scenes/s004_classroom";
import * as s005_carwash from "./scenes/s005_carwash";
import * as s006_graymatter from "./scenes/s006_graymatter";
import * as s007_sold from "./scenes/s007_sold";
import * as s008_careful from "./scenes/s008_careful";
import * as s009_family from "./scenes/s009_family";
import * as s010_hospital from "./scenes/s010_hospital";
import * as s011_arith from "./scenes/s011_arith";
import * as s012_party from "./scenes/s012_party";
import * as s013_tvnews from "./scenes/s013_tvnews";
import * as s014_raid from "./scenes/s014_raid";
import * as s015_jesse_window from "./scenes/s015_jesse_window";
import * as s016_moment from "./scenes/s016_moment";
import * as s017_filing from "./scenes/s017_filing";
import * as s018_garbage from "./scenes/s018_garbage";
import * as s019_rv_buy from "./scenes/s019_rv_buy";
import * as s020_briefs from "./scenes/s020_briefs";
import * as s021_blue from "./scenes/s021_blue";
import * as s022_art from "./scenes/s022_art";
import * as s023_alive from "./scenes/s023_alive";
import * as s024_first_sale from "./scenes/s024_first_sale";
import * as s025_stall from "./scenes/s025_stall";
import * as s026_phosphine from "./scenes/s026_phosphine";
import * as s027_fire from "./scenes/s027_fire";
import * as s028_basement from "./scenes/s028_basement";
import * as s029_list from "./scenes/s029_list";
import * as s030_faint from "./scenes/s030_faint";
import * as s031_talk_down from "./scenes/s031_talk_down";
import * as s032_sell_me from "./scenes/s032_sell_me";
import * as s033_plate from "./scenes/s033_plate";
import * as s034_sorry from "./scenes/s034_sorry";
import * as s035_tuco_name from "./scenes/s035_tuco_name";
import * as s036_tuco_desk from "./scenes/s036_tuco_desk";
import * as s037_itemised from "./scenes/s037_itemised";
import * as s038_boom from "./scenes/s038_boom";
import * as s039_mercury from "./scenes/s039_mercury";
import * as s040_junkyard_math from "./scenes/s040_junkyard_math";
import * as s041_eleven from "./scenes/s041_eleven";
import * as s042_trunk from "./scenes/s042_trunk";
import * as s043_bell from "./scenes/s043_bell";
import * as s044_run from "./scenes/s044_run";
import * as s045_hank_arrives from "./scenes/s045_hank_arrives";
import * as s046_gunfight from "./scenes/s046_gunfight";
import * as s047_jane from "./scenes/s047_jane";
import * as s048_found from "./scenes/s048_found";
import * as s049_watch from "./scenes/s049_watch";
import * as s050_donald from "./scenes/s050_donald";
import * as s051_planes from "./scenes/s051_planes";
import * as s052_gus_offer from "./scenes/s052_gus_offer";
import * as s053_superlab from "./scenes/s053_superlab";
import * as s054_gale from "./scenes/s054_gale";
import * as s055_tomas from "./scenes/s055_tomas";
import * as s056_aztek from "./scenes/s056_aztek";
import * as s057_owns from "./scenes/s057_owns";
import * as s058_argue from "./scenes/s058_argue";
import * as s059_box_cutter from "./scenes/s059_box_cutter";
import * as s060_danger from "./scenes/s060_danger";
import * as s061_leaves from "./scenes/s061_leaves";
import * as s062_plan_gus from "./scenes/s062_plan_gus";
import * as s063_hector_bomb from "./scenes/s063_hector_bomb";
import * as s064_gus_tie from "./scenes/s064_gus_tie";
import * as s065_i_won from "./scenes/s065_i_won";
import * as s066_heisenberg from "./scenes/s066_heisenberg";
import * as s067_top from "./scenes/s067_top";
import * as s068_barrels from "./scenes/s068_barrels";
import * as s069_launder from "./scenes/s069_launder";
import * as s070_hank_home from "./scenes/s070_hank_home";
import * as s071_inscription from "./scenes/s071_inscription";
import * as s072_garage from "./scenes/s072_garage";
import * as s073_huell_plan from "./scenes/s073_huell_plan";
import * as s074_photo from "./scenes/s074_photo";
import * as s075_hank_arrives_2 from "./scenes/s075_hank_arrives_2";
import * as s076_eighty from "./scenes/s076_eighty";
import * as s077_no_face from "./scenes/s077_no_face";
import * as s078_cabin from "./scenes/s078_cabin";
import * as s079_just_die from "./scenes/s079_just_die";
import * as s080_dea_call from "./scenes/s080_dea_call";
import * as s081_charity from "./scenes/s081_charity";
import * as s082_for_a_name from "./scenes/s082_for_a_name";
import * as s083_schwartz_house from "./scenes/s083_schwartz_house";
import * as s084_lasers from "./scenes/s084_lasers";
import * as s085_machine from "./scenes/s085_machine";
import * as s086_jack_lie from "./scenes/s086_jack_lie";
import * as s087_circle from "./scenes/s087_circle";
import * as s088_chain from "./scenes/s088_chain";
import * as s089_handprint from "./scenes/s089_handprint";
import * as s090_diner from "./scenes/s090_diner";
import * as s091_ticket from "./scenes/s091_ticket";
import * as s092_graymatter_end from "./scenes/s092_graymatter_end";
import * as s093_for_me_a from "./scenes/s093_for_me_a";
import * as s094_for_me from "./scenes/s094_for_me";
import * as s095_number from "./scenes/s095_number";
import * as s096_roles from "./scenes/s096_roles";
import * as s097_smartest from "./scenes/s097_smartest";
import * as s098_ozymandias from "./scenes/s098_ozymandias";

export interface SceneEntry { n: number; id: string; cutIn: number; cutOut: number; Scene: React.FC }
export const SCENES: SceneEntry[] = [
  { n: 1, id: "cold-open", cutIn: 0, cutOut: 37.71, Scene: ColdOpen },
  { ...s002_abq.META, Scene: s002_abq.Scene },
  { ...s003_fifty.META, Scene: s003_fifty.Scene },
  { ...s004_classroom.META, Scene: s004_classroom.Scene },
  { ...s005_carwash.META, Scene: s005_carwash.Scene },
  { ...s006_graymatter.META, Scene: s006_graymatter.Scene },
  { ...s007_sold.META, Scene: s007_sold.Scene },
  { ...s008_careful.META, Scene: s008_careful.Scene },
  { ...s009_family.META, Scene: s009_family.Scene },
  { ...s010_hospital.META, Scene: s010_hospital.Scene },
  { ...s011_arith.META, Scene: s011_arith.Scene },
  { ...s012_party.META, Scene: s012_party.Scene },
  { ...s013_tvnews.META, Scene: s013_tvnews.Scene },
  { ...s014_raid.META, Scene: s014_raid.Scene },
  { ...s015_jesse_window.META, Scene: s015_jesse_window.Scene },
  { ...s016_moment.META, Scene: s016_moment.Scene },
  { ...s017_filing.META, Scene: s017_filing.Scene },
  { ...s018_garbage.META, Scene: s018_garbage.Scene },
  { ...s019_rv_buy.META, Scene: s019_rv_buy.Scene },
  { ...s020_briefs.META, Scene: s020_briefs.Scene },
  { ...s021_blue.META, Scene: s021_blue.Scene },
  { ...s022_art.META, Scene: s022_art.Scene },
  { ...s023_alive.META, Scene: s023_alive.Scene },
  { ...s024_first_sale.META, Scene: s024_first_sale.Scene },
  { ...s025_stall.META, Scene: s025_stall.Scene },
  { ...s026_phosphine.META, Scene: s026_phosphine.Scene },
  { ...s027_fire.META, Scene: s027_fire.Scene },
  { ...s028_basement.META, Scene: s028_basement.Scene },
  { ...s029_list.META, Scene: s029_list.Scene },
  { ...s030_faint.META, Scene: s030_faint.Scene },
  { ...s031_talk_down.META, Scene: s031_talk_down.Scene },
  { ...s032_sell_me.META, Scene: s032_sell_me.Scene },
  { ...s033_plate.META, Scene: s033_plate.Scene },
  { ...s034_sorry.META, Scene: s034_sorry.Scene },
  { ...s035_tuco_name.META, Scene: s035_tuco_name.Scene },
  { ...s036_tuco_desk.META, Scene: s036_tuco_desk.Scene },
  { ...s037_itemised.META, Scene: s037_itemised.Scene },
  { ...s038_boom.META, Scene: s038_boom.Scene },
  { ...s039_mercury.META, Scene: s039_mercury.Scene },
  { ...s040_junkyard_math.META, Scene: s040_junkyard_math.Scene },
  { ...s041_eleven.META, Scene: s041_eleven.Scene },
  { ...s042_trunk.META, Scene: s042_trunk.Scene },
  { ...s043_bell.META, Scene: s043_bell.Scene },
  { ...s044_run.META, Scene: s044_run.Scene },
  { ...s045_hank_arrives.META, Scene: s045_hank_arrives.Scene },
  { ...s046_gunfight.META, Scene: s046_gunfight.Scene },
  { ...s047_jane.META, Scene: s047_jane.Scene },
  { ...s048_found.META, Scene: s048_found.Scene },
  { ...s049_watch.META, Scene: s049_watch.Scene },
  { ...s050_donald.META, Scene: s050_donald.Scene },
  { ...s051_planes.META, Scene: s051_planes.Scene },
  { ...s052_gus_offer.META, Scene: s052_gus_offer.Scene },
  { ...s053_superlab.META, Scene: s053_superlab.Scene },
  { ...s054_gale.META, Scene: s054_gale.Scene },
  { ...s055_tomas.META, Scene: s055_tomas.Scene },
  { ...s056_aztek.META, Scene: s056_aztek.Scene },
  { ...s057_owns.META, Scene: s057_owns.Scene },
  { ...s058_argue.META, Scene: s058_argue.Scene },
  { ...s059_box_cutter.META, Scene: s059_box_cutter.Scene },
  { ...s060_danger.META, Scene: s060_danger.Scene },
  { ...s061_leaves.META, Scene: s061_leaves.Scene },
  { ...s062_plan_gus.META, Scene: s062_plan_gus.Scene },
  { ...s063_hector_bomb.META, Scene: s063_hector_bomb.Scene },
  { ...s064_gus_tie.META, Scene: s064_gus_tie.Scene },
  { ...s065_i_won.META, Scene: s065_i_won.Scene },
  { ...s066_heisenberg.META, Scene: s066_heisenberg.Scene },
  { ...s067_top.META, Scene: s067_top.Scene },
  { ...s068_barrels.META, Scene: s068_barrels.Scene },
  { ...s069_launder.META, Scene: s069_launder.Scene },
  { ...s070_hank_home.META, Scene: s070_hank_home.Scene },
  { ...s071_inscription.META, Scene: s071_inscription.Scene },
  { ...s072_garage.META, Scene: s072_garage.Scene },
  { ...s073_huell_plan.META, Scene: s073_huell_plan.Scene },
  { ...s074_photo.META, Scene: s074_photo.Scene },
  { ...s075_hank_arrives_2.META, Scene: s075_hank_arrives_2.Scene },
  { ...s076_eighty.META, Scene: s076_eighty.Scene },
  { ...s077_no_face.META, Scene: s077_no_face.Scene },
  { ...s078_cabin.META, Scene: s078_cabin.Scene },
  { ...s079_just_die.META, Scene: s079_just_die.Scene },
  { ...s080_dea_call.META, Scene: s080_dea_call.Scene },
  { ...s081_charity.META, Scene: s081_charity.Scene },
  { ...s082_for_a_name.META, Scene: s082_for_a_name.Scene },
  { ...s083_schwartz_house.META, Scene: s083_schwartz_house.Scene },
  { ...s084_lasers.META, Scene: s084_lasers.Scene },
  { ...s085_machine.META, Scene: s085_machine.Scene },
  { ...s086_jack_lie.META, Scene: s086_jack_lie.Scene },
  { ...s087_circle.META, Scene: s087_circle.Scene },
  { ...s088_chain.META, Scene: s088_chain.Scene },
  { ...s089_handprint.META, Scene: s089_handprint.Scene },
  { ...s090_diner.META, Scene: s090_diner.Scene },
  { ...s091_ticket.META, Scene: s091_ticket.Scene },
  { ...s092_graymatter_end.META, Scene: s092_graymatter_end.Scene },
  { ...s093_for_me_a.META, Scene: s093_for_me_a.Scene },
  { ...s094_for_me.META, Scene: s094_for_me.Scene },
  { ...s095_number.META, Scene: s095_number.Scene },
  { ...s096_roles.META, Scene: s096_roles.Scene },
  { ...s097_smartest.META, Scene: s097_smartest.Scene },
  { ...s098_ozymandias.META, Scene: s098_ozymandias.Scene },
];
export const FILM_END = 1644.32; // narration length (s)
