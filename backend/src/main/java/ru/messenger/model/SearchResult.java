package ru.messenger.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class SearchResult<T> {
    private List<T> list;
    private Long total;
}
