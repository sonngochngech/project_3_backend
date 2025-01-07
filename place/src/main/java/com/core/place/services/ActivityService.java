package com.core.place.services;

import com.core.place.config.constant.PlaceConfig;
import com.core.place.dto.ItineraryDto;
import com.core.place.entities.Activity;
import com.core.place.entities.Location;
import com.core.place.entities.Term;
import com.core.place.payloads.requests.ItineraryReqDto;
import com.core.place.repositories.ActivityRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.*;

import static com.core.place.config.constant.PlaceConfig.*;


@Service
public class ActivityService {

    @Autowired
    private ActivityRepo activityRepo;


    public ItineraryDto findActivities(ItineraryReqDto itinerary) {

        int duration = (int) ChronoUnit.DAYS.between(itinerary.getStartDate().toInstant(), itinerary.getEndDate().toInstant())+1;
        List<Integer> term=findTerm(itinerary.getStartTime(),itinerary.getEndTime(),duration);
        List<List<String>> termPerDays=findDayTerm(itinerary.getStartTime(),itinerary.getEndTime(),duration);

        int breakfastCount=term.get(0);
        int lunchCount=term.get(1);
        int dinnerCount=term.get(2);
        int morningCount=term.get(3);
        int afternoonCount=term.get(4);
        int nightCount=term.get(5);

        List<Activity> activities= activityRepo.findAllByCityId(itinerary.getDestinationCode()).orElseThrow(()-> new RuntimeException("Error"));
        Map<Activity,Double> activityScores = rankingPlaces(activities, itinerary.getUserPreferences());

        sortActivitiesByScore(activities,activityScores);

        List<Activity> morningActivities= findActivitiesByType(activities, PlaceConfig.Term.MORNING.toString(),morningCount,itinerary.getBudget()/3,activityScores);
        List<Activity> afternoonActivities=findActivitiesByType(activities, PlaceConfig.Term.AFTERNOON.toString(),afternoonCount,itinerary.getBudget()/3,activityScores);
        List<Activity> nightActivities=findActivitiesByType(activities, PlaceConfig.Term.EVENING.toString(),nightCount,itinerary.getBudget()/3,activityScores);

        List<Activity> entireActivities = new ArrayList<>(morningActivities);
        entireActivities.addAll(afternoonActivities);
        entireActivities.addAll(nightActivities);


        Map<Pair<Integer,Integer>,Double> distanceMatrix = getDistanceMatrix(entireActivities);
        List<List<Activity>> activitiesPerDay= matchActivitiesToDay(entireActivities,termPerDays,distanceMatrix);



        return ItineraryDto.builder().activities(activitiesPerDay).breakfastCount(breakfastCount).lunchCount(lunchCount).dinnerCount(dinnerCount).build();
    }


    private  Map<Activity,Double> rankingPlaces(List<Activity> activities, List<String> userPreferences) {

        Map<Activity,Double> result= new HashMap<>();

        for (Activity activity : activities) {
            Double score = calculateActivityScore(activity, userPreferences);
            result.put(activity, score);
        }
        return result;
    }

    private void sortActivitiesByScore(List<Activity> activities,Map<Activity,Double> scores){
        activities.sort((o1, o2) -> {
            Double score1 = scores.get(o1);
            Double score2 = scores.get(o2);
            return score1.compareTo(score2);
        });
    }

    private Double calculateActivityScore(Activity activity,List<String> userPreferences){
        int suitableScore=0;
        if(userPreferences.contains(activity.getType())){
            suitableScore=1;
        }

        Long rawPopularity=Optional.of(activity).map(Activity::getLocation).map(Location::getRatingCount).orElse(null);
        Double popularityScore = rawPopularity!=null? standardize(rawPopularity.doubleValue()):0.0;
        Double rawRating = Optional.of(activity).map(Activity::getLocation).map(Location::getRating).orElse(null);
        Double ratingScore = rawRating!=null ? standardize(activity.getLocation().getRating()):0.0;

        return PLACE_PREFERENCE_WEIGHT*suitableScore+ PLACE_POPULARITY_WEIGHT+popularityScore+PLACE_QUALITY_WEIGHT*ratingScore;
    }

    private Double standardize(Double value) {
        return value/ (value + 1);
    }

    private List<Integer> findTerm(int startTime, int endTime, int duration){
        int breakfastCount=0;
        int lunchCount=0;
        int dinnerCount=0;
        int morningCount=0;
        int afternoonCount=0;
        int nightCount=0;
        List<Integer> result= new ArrayList<>();
        if(startTime> PlaceConfig.START_MORNING && startTime< PlaceConfig.END_MORNING){
            lunchCount++;
            dinnerCount++;
            afternoonCount++;
            nightCount++;
        }
        if(startTime> PlaceConfig.START_AFTERNOON && startTime< PlaceConfig.END_AFTERNOON){
            nightCount++;
        }

        if(endTime> PlaceConfig.START_MORNING && endTime< PlaceConfig.END_MORNING){
            breakfastCount++;
        }
        if(endTime> PlaceConfig.START_AFTERNOON && endTime< PlaceConfig.END_AFTERNOON){
            lunchCount++;
            breakfastCount++;
            morningCount++;
        }
        if(endTime> PlaceConfig.START_EVENING && endTime< PlaceConfig.END_EVENING){
            dinnerCount++;
            lunchCount++;
            afternoonCount++;
            morningCount++;
        }

        breakfastCount+=(duration-2);
        lunchCount+=(duration-2);
        dinnerCount+=(duration-2);
        morningCount+=(duration-2);
        afternoonCount+=(duration-2);
        nightCount+=(duration-2);

        result.add(breakfastCount);
        result.add(lunchCount);
        result.add(dinnerCount);
        result.add(morningCount);
        result.add(afternoonCount);
        result.add(nightCount);

        return result;

    }

    private List<List<String>> findDayTerm(int startTime, int endTime, int duration ) {
        List<List<String>>  result= new ArrayList<>();
        List<String> day1= new ArrayList<>();
        if(startTime> PlaceConfig.START_MORNING && startTime< PlaceConfig.END_MORNING){
            day1.add(PlaceConfig.Term.AFTERNOON.toString());
            day1.add(PlaceConfig.Term.EVENING.toString());
        }
        if(startTime> PlaceConfig.START_AFTERNOON && startTime< PlaceConfig.END_AFTERNOON){
            day1.add(PlaceConfig.Term.EVENING.toString());
        }
        result.add(day1);
        while(duration-2>0){
            List<String> day= new ArrayList<>();
            day.add(PlaceConfig.Term.MORNING.toString());
            day.add(PlaceConfig.Term.AFTERNOON.toString());
            day.add(PlaceConfig.Term.EVENING.toString());
            result.add(day);
            duration--;
        }
        List<String> endDay= new ArrayList<>();
        if(endTime> PlaceConfig.START_AFTERNOON && endTime< PlaceConfig.END_AFTERNOON){
            endDay.add(PlaceConfig.Term.MORNING.toString());
        }
        if(endTime> PlaceConfig.START_EVENING && endTime< PlaceConfig.END_EVENING){
            endDay.add(PlaceConfig.Term.AFTERNOON.toString());
            endDay.add(PlaceConfig.Term.MORNING.toString());
        }
        result.add(endDay);
        return  result;
    }


    private List<Activity> findActivitiesByType(List<Activity> activities, String type,Integer count,Integer budget,Map<Activity,Double> scores){
        int totalDuration=count*4;
        List<Activity> filterAc=activities.stream().filter(activity -> activity.getTerms().stream().anyMatch(term -> term.getName().equals(type))).toList();
        List<Activity> result= new ArrayList<>();
        findSpecificActivities(result,filterAc,totalDuration,budget,scores);
        result.forEach(activities::remove);
        return  result;

    }

    private void findSpecificActivities(List<Activity> result,List<Activity> activities,int duration, int budget,Map<Activity,Double> scores){
        for(Activity activity: activities){
            int currentDuration= result.stream().mapToInt(Activity::getDuration).sum();
            int currentPrice= result.stream().mapToInt(Activity::getPrice).sum();
            if(currentDuration+ activity.getDuration()<=duration && currentPrice+ activity.getPrice()<=budget){
                result.add(activity);
            }
        }
    }

    private Map<Pair<Integer,Integer>,Double> getDistanceMatrix(List<Activity> activities){
        Map<Pair<Integer,Integer>,Double> result= new HashMap<>();
        for(Activity activity: activities){
            for(Activity activity1: activities){
                Double distance=0.0;
                if(activity.getLocation().getLatitude()==null || activity1.getLocation().getLatitude()==null){
                    distance= Double.MAX_VALUE;
                }else{
                    distance= Math.sqrt(Math.pow( activity.getLocation().getLatitude()- activity1.getLocation().getLatitude(),2)+Math.pow(activity.getLocation().getLongitude()-activity1.getLocation().getLongitude(),2));
                }
                result.put(Pair.of(activity.getId().intValue(),activity1.getId().intValue()),distance);
            }
        }
        return  result;
    }

    private  List<List<Activity>> matchActivitiesToDay(List<Activity> entireActivities,
                                                     List<List<String>> terms,
                                                     Map<Pair<Integer,Integer>,Double> distanceMatrix){
        List<List<Activity>> result= new ArrayList<>();
        terms.forEach((day)->{
            List<Activity> dayActivities= new ArrayList<>();
            day.forEach((term)->{
                int totalTermTime=0;
                Activity previousActivity=!dayActivities.isEmpty()? dayActivities.get(dayActivities.size()-1):null;

                while(totalTermTime<4){
                    int remainTermTime = 4-totalTermTime;
                    List<Activity> filterAc=entireActivities.stream().filter(activity ->{
                        if(activity.getDuration()>remainTermTime) return false;
                        return activity.getTerms().stream().anyMatch(term1 -> term1.getName().equals(term));
                    }).toList();
                    Activity act=findNearestActivity(previousActivity,filterAc,distanceMatrix);

                    if(act==null) act=assignDefaultActivity(term,remainTermTime);
                    else  entireActivities.remove(act);
                    totalTermTime+=act.getDuration();
                    dayActivities.add(act);
                }
            });
            result.add(dayActivities);
        });
        return result;

    }

    private Activity findNearestActivity( Activity previousActivity, List<Activity> filterAc, Map<Pair<Integer,Integer>,Double> distanceMatrix){
        if(filterAc.isEmpty()) return null;
        if(previousActivity==null || previousActivity.getId() == null) return filterAc.get(0);
        Double minDistance= Double.MAX_VALUE;
        Activity minAct= filterAc.get(0);
        for(Activity activity: filterAc){
            Double distance= distanceMatrix.get(Pair.of(previousActivity.getId().intValue(),activity.getId().intValue()));
            if(distance<minDistance){
                minDistance=distance;
                minAct=activity;
            }
        }
        return minAct;
    }

    private Activity assignDefaultActivity(String term, int duration){
        return  Activity.builder().name(defaultActivity.RELAX_IN_CAFE.toString())
                .terms(Collections.singleton(Term.builder().name(term).build()))
                .Duration(duration)
                .price(null)
                .location(null)
                .build();
    }




}
